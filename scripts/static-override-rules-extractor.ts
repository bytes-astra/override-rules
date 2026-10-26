/**
 * 静态覆写规则提取器
 *
 * 载入 convert.js，以固定参数调用其 main(config)，把 `proxy-groups`、
 * `rule-providers`、`rules` 三段提取为静态覆写脚本形态：
 *
 * ```js
 * const main = (config) => {
 *   config["proxy-groups"] = [...];
 *   config["rule-providers"] = {...};
 *   config["rules"] = [...];
 *   return config;
 * };
 * ```
 *
 * 与 YAML 生成器的区别：YAML 生成器用 fake_proxies.json 模拟订阅，
 * 地区组只能覆盖该夹具里出现过的地区；本脚本默认按 countriesMeta
 * 为每个地区构造足量节点，使全部地区组都被生成，
 * 组内节点仍由内核按 countriesMeta 的正则在运行时筛选。
 *
 * 分组顺序：「选择代理」「自动选择」「手动选择」「故障转移」置于最前，
 * 其余分组保持内核产出的原有相对顺序。
 *
 * 用法：
 * - `npm run extract` —— 使用全地区节点集，输出 `override-rules.js`
 * - `npm run extract -- --input <fixture.json>` —— 指定节点夹具
 * - `npm run extract -- --grouptype 0` —— 地区组改为 select
 * - `npm run extract -- --out <file.js>` —— 指定输出路径
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

import { countriesMeta } from "../src/catalog/countries";
import { PROXY_GROUPS } from "../src/catalog/group-names";
import type { ClashConfig } from "../src/types/clash";
import type { ProxyNode } from "../src/types/proxy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.resolve(__dirname, "..");
const CONVERT_FILE = path.join(BASE_DIR, "convert.js");
const DEFAULT_OUT_FILE = path.join(BASE_DIR, "override-rules.js");

/** 提取时固定传给 convert.js 的参数；`regex=true` 让内核按正则筛选节点。 */
const SCRIPT_ARGS = {
    ipv6: false,
    full: false,
    keepalive: false,
    fakeip: true,
    quic: false,
    tun: false,
    regex: true,
    threshold: 2,
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface ExtractOptions {
    /** 节点夹具路径（含 proxies 数组的 JSON）；缺省时使用全地区节点集。 */
    input?: string;
    /** 输出文件路径。 */
    out: string;
    /** 地区代理组类型：0=select，1=url-test，2=load-balance。 */
    groupType: string;
}

interface VmSandbox extends Record<string, unknown> {
    $arguments: Record<string, unknown>;
    console: Console;
    main?: (config: ClashConfig) => ClashConfig;
}

/** 解析命令行参数。 */
function parseOptions(argv: string[]): ExtractOptions {
    const options: ExtractOptions = { out: DEFAULT_OUT_FILE, groupType: "1" };

    for (let index = 0; index < argv.length; index++) {
        const arg = argv[index];
        const value = argv[index + 1];

        if (value === undefined || value.startsWith("--")) {
            throw new Error(`参数 ${arg} 缺少取值`);
        }

        if (arg === "--input") {
            options.input = value;
        } else if (arg === "--out") {
            options.out = value;
        } else if (arg === "--grouptype") {
            options.groupType = value;
        } else {
            throw new Error(`未知参数：${arg}`);
        }

        index += 1;
    }

    return options;
}

/**
 * 为 countriesMeta 中每个地区构造两个节点。
 *
 * 地区组按生成时的节点数量筛选（threshold=2），足量节点能让全部地区组都被生成；
 * 组内节点在运行时仍由内核按各国正则筛选，因此与真实节点名无关。
 */
function buildFullRegionProxies(): ProxyNode[] {
    const proxies: ProxyNode[] = [];
    for (const country of Object.keys(countriesMeta)) {
        proxies.push({ name: `${country} 01` }, { name: `${country} 02` });
    }
    return proxies;
}

/** 载入节点夹具；未指定时使用全地区节点集。 */
function loadInputConfig(input?: string): ClashConfig {
    if (!input) {
        return { proxies: buildFullRegionProxies() };
    }

    const raw = readFileSync(path.resolve(input), "utf-8");
    const json = JSON.parse(raw) as ClashConfig;
    if (!json.proxies || !Array.isArray(json.proxies)) {
        throw new Error(`${input} 缺少 proxies 数组`);
    }
    return json;
}

/** 在 vm 沙箱中运行 convert.js 并调用其 main(config)。 */
function runConvert(baseConfig: ClashConfig, groupType: string): ClashConfig {
    const code = readFileSync(CONVERT_FILE, "utf-8");
    const sandbox: VmSandbox = {
        $arguments: { ...SCRIPT_ARGS, grouptype: groupType },
        console,
    };

    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: "convert.js" });

    if (typeof sandbox.main !== "function") {
        throw new Error("convert.js 未暴露 main 函数 (未在顶层定义?)");
    }

    const configCopy = JSON.parse(JSON.stringify(baseConfig)) as ClashConfig;
    return sandbox.main(configCopy);
}

// ---------- 序列化 ----------

const INDENT = "  ";
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * 置于覆写脚本最前的分组，数组顺序即展示顺序。
 *
 * 内核把「自动选择」「故障转移」放在尾部，把「选择代理」「手动选择」放在最前；
 * 覆写脚本面向手动挑选场景，这里统一把四个常用分组提到最前，其余分组保持原有相对顺序。
 */
const FRONT_GROUP_NAMES = [
    PROXY_GROUPS.SELECT,
    PROXY_GROUPS.AUTO,
    PROXY_GROUPS.MANUAL,
    PROXY_GROUPS.FALLBACK,
] as const;

/** rule-providers 的字段顺序，按覆写脚本的常见写法排列。 */
const PROVIDER_FIELD_ORDER = ["url", "path", "behavior", "interval", "format", "type"];

function formatKey(key: string): string {
    return IDENTIFIER.test(key) ? key : JSON.stringify(key);
}

function formatPrimitive(value: JsonValue): string {
    if (typeof value === "string") return JSON.stringify(value);
    if (value === null) return "null";
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return JSON.stringify(value);
}

/**
 * 将配置值渲染为覆写脚本中的字面量。
 *
 * @param inlineArray - 数组元素是否排在一行（对应 `proxies` 的写法）
 */
function formatValue(value: JsonValue, level: number, inlineArray = false): string {
    const pad = INDENT.repeat(level);

    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";

        if (inlineArray) {
            const items = value.map(formatPrimitive).join(", ");
            return `[\n${pad}${INDENT}${items}\n${pad}]`;
        }

        const items = value
            .map((item) => `${pad}${INDENT}${formatValue(item, level + 1)}`)
            .join(",\n");
        return `[\n${items}\n${pad}]`;
    }

    if (value !== null && typeof value === "object") {
        const items = Object.entries(value)
            .map(
                ([key, item]) =>
                    `${pad}${INDENT}${formatKey(key)}: ${formatValue(item, level + 1, key === "proxies")}`
            )
            .join(",\n");
        return `{\n${items}\n${pad}}`;
    }

    return formatPrimitive(value);
}

/** 按 `PROVIDER_FIELD_ORDER` 重排 rule-providers 的字段。 */
function reorderProviders(providers: Record<string, JsonValue>): Record<string, JsonValue> {
    const result: Record<string, JsonValue> = {};

    for (const [name, provider] of Object.entries(providers)) {
        if (provider === null || typeof provider !== "object" || Array.isArray(provider)) {
            result[name] = provider;
            continue;
        }

        const ordered: Record<string, JsonValue> = {};
        for (const field of PROVIDER_FIELD_ORDER) {
            if (field in provider) ordered[field] = provider[field];
        }
        for (const [field, value] of Object.entries(provider)) {
            if (!(field in ordered)) ordered[field] = value;
        }
        result[name] = ordered;
    }

    return result;
}

/** 取出代理组的名称；非对象或缺少名称时返回 undefined。 */
function groupName(group: JsonValue): string | undefined {
    if (group === null || typeof group !== "object" || Array.isArray(group)) return undefined;
    const name = (group as { name?: unknown }).name;
    return typeof name === "string" ? name : undefined;
}

/**
 * 把 `FRONT_GROUP_NAMES` 中的分组按声明顺序移到最前，其余分组保持原有相对顺序。
 *
 * 目标分组缺失时（例如展平模式下没有「手动选择」）自动跳过，不报错。
 */
function reorderGroups(groups: JsonValue[]): JsonValue[] {
    const front: JsonValue[] = [];
    const taken = new Set<JsonValue>();

    for (const name of FRONT_GROUP_NAMES) {
        const group = groups.find(
            (candidate) => !taken.has(candidate) && groupName(candidate) === name
        );
        if (group === undefined) continue;
        front.push(group);
        taken.add(group);
    }

    return [...front, ...groups.filter((group) => !taken.has(group))];
}

/** 组装完整的覆写脚本文本。 */
function buildScript(config: ClashConfig, groupType: string, groups: JsonValue[]): string {
    const providers = reorderProviders(
        (config["rule-providers"] ?? {}) as unknown as Record<string, JsonValue>
    );
    const rules = (config.rules ?? []) as unknown as JsonValue;

    const header = [
        "/**",
        " * 由 override-rules 的 convert.js 静态提取生成（Sub-Store / Mihomo 覆写脚本）。",
        ` * 提取参数：regex=${SCRIPT_ARGS.regex}, grouptype=${groupType}, ipv6=${SCRIPT_ARGS.ipv6}, full=${SCRIPT_ARGS.full},`,
        ` *          keepalive=${SCRIPT_ARGS.keepalive}, fakeip=${SCRIPT_ARGS.fakeip}, quic=${SCRIPT_ARGS.quic}, tun=${SCRIPT_ARGS.tun}, threshold=${SCRIPT_ARGS.threshold}`,
        ` * 地区组覆盖 src/catalog/countries.ts 声明的全部 ${Object.keys(countriesMeta).length} 个地区。`,
        " * 节点筛选由内核按 countriesMeta 的正则在运行时完成，不依赖具体节点名。",
        " * 生成命令：npm run extract",
        " */",
    ].join("\n");

    return [
        header,
        "const main = (config) => {",
        `  config["proxy-groups"] = ${formatValue(groups, 1)};`,
        `  config["rule-providers"] = ${formatValue(providers, 1)};`,
        `  config["rules"] = ${formatValue(rules, 1)};`,
        "  return config;",
        "};",
        "",
    ].join("\n");
}

/** 提取主流程。 */
export function main(): void {
    if (!existsSync(CONVERT_FILE)) {
        throw new Error("未找到 convert.js，请先运行 npm run build");
    }

    const options = parseOptions(process.argv.slice(2));
    const config = runConvert(loadInputConfig(options.input), options.groupType);
    const orderedGroups = reorderGroups((config["proxy-groups"] ?? []) as unknown as JsonValue[]);
    const script = buildScript(config, options.groupType, orderedGroups);

    const outFile = path.resolve(options.out);
    writeFileSync(outFile, script, "utf-8");

    const groups = config["proxy-groups"] ?? [];
    const providers = config["rule-providers"] ?? {};
    const rules = config.rules ?? [];
    const regionGroups = groups
        .map((group) => group.name)
        .filter((name) => name.endsWith("节点") && name !== "低倍率节点");
    const presentNames = new Set(
        orderedGroups.map((group) => groupName(group)).filter((name) => name !== undefined)
    );
    const frontGroups = FRONT_GROUP_NAMES.filter((name) => presentNames.has(name));

    const relativeOut = path.relative(process.cwd(), outFile);
    console.log(`已生成 ${relativeOut.startsWith("..") ? outFile : relativeOut}`);
    console.log(`  proxy-groups  : ${groups.length} 组`);
    console.log(`  rule-providers: ${Object.keys(providers).length} 个`);
    console.log(`  rules         : ${rules.length} 条`);
    console.log(`  前置分组       : ${frontGroups.join(", ")}`);
    console.log(`  地区组         : ${regionGroups.length} 个（${regionGroups.join(", ")}）`);
}

try {
    main();
} catch (error) {
    console.error("提取失败:", error);
    process.exit(1);
}
