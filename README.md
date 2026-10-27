## bytes-astra 的 Mihomo/Substore 覆写规则（powerfullz 上游 fork）

![](img/cover.png)

[![](https://data.jsdelivr.com/v1/package/gh/bytes-astra/override-rules/badge?style=rounded)](https://www.jsdelivr.com/package/gh/bytes-astra/override-rules)

本仓库为 Mihomo/Substore 设计，提供高效、灵活的覆写规则（**不建议用于 Stash**）。本 fork 仅发布**静态覆写脚本**（`override-rules.js`）：由上游的动态覆写脚本以固定参数提取生成，无需客户端执行 JS 逻辑，直接覆盖 `proxy-groups` / `rule-providers` / `rules` 三段。

核心特色如下：

* 集成 [SukkaW/Surge](https://github.com/SukkaW/Surge) 与 [217heidai/adblockfilters](https://github.com/217heidai/adblockfilters) 等优质规则，兼容性强，覆盖面广。
* 针对 Truth Social、E-Hentai、TikTok、加密货币等场景，新增专用分流规则，满足多样化需求。
* 精简冗余，结构清晰，维护便捷。
* 深度融合 [Loyalsoldier/v2ray-rules-dat](https://github.com/Loyalsoldier/v2ray-rules-dat) GeoSite/GeoIP，分流更精准。
* IP 规则默认添加 `no-resolve`，有效减少本地 DNS 解析，提升速度与隐私。
* 节点筛选由 Mihomo 内核按地区正则在运行时完成（`include-all` + `filter`），不依赖具体节点名，任意订阅可用。
* 「选择代理」「自动选择」「手动选择」「故障转移」四个常用分组前置，其余分组保持原有相对顺序。

> 上游原版（JS 动态覆写 + 192 个 YAML 组合）请访问 [powerfullz/override-rules](https://github.com/powerfullz/override-rules)。

### 使用方法

**静态覆写脚本链接**

- **最新正式版**（跟随最新发布 tag）：

  ```
  https://cdn.jsdelivr.net/gh/bytes-astra/override-rules/override-rules.js
  ```

- **锁定版本**：

  ```
  https://cdn.jsdelivr.net/gh/bytes-astra/override-rules@vX.Y.Z/override-rules.js
  ```

- **预览版**（push 到 `main` 后自动构建的 `preview` 分支）：

  ```
  https://raw.githubusercontent.com/bytes-astra/override-rules/refs/heads/preview/override-rules.js
  ```

- **校验索引**（各文件 sha256）：

  ```
  https://cdn.jsdelivr.net/gh/bytes-astra/override-rules/manifest.json
  ```

**Clash Party/Sparkle**

1.  打开 Clash Party → 左侧「覆写」→ 粘贴上述链接导入。
2.  打开「订阅管理」→ 目标订阅右上角三个点 → 「编辑信息」→ 选择该覆写脚本 → 保存。

需要注意，Clash Party 在默认设置下还会接管 DNS 和 SNI（域名嗅探），需要手动在设置中关闭「控制 DNS 设置」和「控制域名嗅探」两个选项。

**SubStore**

参考[最速 Substore 订阅管理指南](https://blog.l3zc.com/2025/03/clash-subscription-convert/)。在「脚本操作」处填入上述静态脚本链接即可（静态脚本无 URL 参数）。

**Clash Verge 系（Clash Verge Rev、Clash Nyanpasu 等）**

静态覆写脚本为 JS 格式，需客户端支持执行 JS 覆写；不支持 JS 的旧版客户端请使用上游的 YAML 格式覆写。

### 静态脚本的固定参数

静态脚本由 `npm run extract` 以固定参数生成，等价于上游动态脚本的以下配置：

* `regex=true`（节点由内核按正则筛选，`include-all` 模式）
* `grouptype=1`（地区代理组为 url-test 自动测速）
* `fakeip=true`（DNS 使用 fake-ip 模式）
* 其余参数（`ipv6` / `full` / `keepalive` / `quic` / `tun`）均为 `false`，`threshold=2`

地区组覆盖 [src/catalog/countries.ts](src/catalog/countries.ts) 声明的全部 22 个地区；需要不同参数组合时，请在 fork 内修改 [scripts/static-override-rules-extractor.ts](scripts/static-override-rules-extractor.ts) 中的 `SCRIPT_ARGS` 后重新生成，或直接使用上游的 JS 动态覆写脚本传参。

### 关于 DNS 泄露的说明

很多人问用了这覆写规则跑 DNS 泄露测试说会泄露，为此我写了一篇文章澄清一些误解，具体请见[「关于 DNS 泄露及其相关误解的说明」](https://blog.l3zc.com/2026/05/dns-leak-misunderstanding/)。

### 关于部分特殊代理组的说明

**静态资源**：包含所有常见静态资源 CDN 域名、对象存储域名。大部分网站的静态资源（如图片、视频、音频、字体、JS、CSS）都有独立域名、不设置风控措施、不设置鉴权，这些静态资源可以使用 IP 不一定干净（例如 IDC 类 IP）、但是带宽更大、延时更低、而且有和大部分主流 CDN（如 Cloudflare、Akamai、Fastly、EdgeCast）在 IXP 有互联的网络出口。一般就实践经验来看，在正常上网中这部分域名产生的流量占据约 70% 左右。如果你在使用商业性质的远端策略服务提供商、且该服务上提供了低倍率节点，你可以将这部分域名分流至低倍率节点以节省流量。检测到「低倍率节点」组时，本组会自动将其置于候选首位，其余候选保持正常顺序。[^fn1]

[^fn1]: 来源：[我有特别的 Surge 配置和使用技巧](https://blog.skk.moe/post/i-have-my-unique-surge-setup/)

**搜狗输入**：默认放行，作用是避免搜狗输入法将你输入的每一个字符自动收集并通过`get.sogou.com/q`等域名回传。隐私担忧者可以将其设置为`REJECT`，开启后会影响搜狗输入法账号同步、词库更新、问题反馈，但语音输入等其他功能可以正常使用。

~~**Play 商店修复**：~~ 修复国行设备因使用`services.googleapis.cn`域名导致的 Google Play 下载应用时的「等待中…」问题。详见：[「Google Play 商店的国内 CDN：从密码学入门到分流策略优化」](https://blog.l3zc.com/2025/03/chinese-cdn-used-by-playstore/)，已经是默认行为。

~~**Steam 修复**：~~ 用于让 Steam 客户端调用国内 CDN 及 P2P 网络下载，节省大量流量，已经是默认行为。

### 关于链式代理的说明

对于使用机场线路配合自行购买的落地机进行链式代理的情况，在 Substore 添加自建节点时，加入`dialer-proxy: "前置代理"`脚本即可自动识别，并新增「前置代理」和「落地节点」两个代理组。检测到落地节点后，地区分类只扫描非落地节点；若订阅全部由落地节点组成，「前置代理」组仅保留 `DIRECT`。

![新增的代理组](img/dialer-group.png) ![如何配置自建节点](img/dialer-example.png)

### 关于 Tailscale 的说明

Mihomo 内核在近期的更新中支持了 Tailscale 出站，这覆写规则也做出了更新，当检测到订阅中存在`tailscale`类型的节点时，会自动配置相关的代理组、Tun 配置和分流规则，开箱即用，支持 Magic DNS，以下是 Tailscale 节点配置的示例：

「Tailscale」代理组默认带有 `hidden: true`，不会显示在客户端的代理组列表中；Tailscale 节点也不会进入「手动选择」、展平模式下的 `选择代理` / `自动选择` / `故障转移` / 各服务组，以及「前置代理」等常规候选列表，仅通过 `100.64.0.0/10`、`fd7a:115c:a1e0::/48` 和 `ts.net` 的定向分流规则使用。

```yaml
proxies:
  - name: "Tailscale出口"   # 注意节点名称不能为 Tailscale，否则会和代理组重名造成启动出错
    type: tailscale
    auth-key: tskey-auth-xxxxxxxx
    control-url: https://controlplane.tailscale.com
    ephemeral: true
    udp: true
```

### 如何自定义与贡献

**如果你想基于本项目深度定制自己专属的覆写规则：**

请阅读 [如何自定义专属覆写规则](docs/HOW_TO_CUSTOMISE.md)。里面详细介绍了如何修改默认参数、调整代理组及增添自定义的 Rule Providers。

**如果你想为本项目贡献代码或新增特性：**

请阅读 [贡献指南](docs/HOW_TO_CONTRIBUTE.md)。里面包含关于代码规范、开发流与提交 PR 的要求。

**如果你是 AI AGENT：**

请阅读 [`./AGENTS.md`](./AGENTS.md)。
