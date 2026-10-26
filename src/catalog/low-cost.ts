/**
 * 低倍率节点的匹配规则。
 */

import { createCaseInsensitiveNodeMatcher } from "../utils/regex";

/**
 * 匹配低倍率节点名称的正则。
 *
 * 两类写法：
 * - 小数倍率（0.0~0.5），可带或不带 `x` 后缀，例如「0.2x」「0.5倍速」；
 * - 整数倍率 `1x`，例如「比利时 | 1x BE」。
 *
 * 只收 1x：机场节点名里的 `Nx` 是流量消耗倍率，数字越大越贵，
 * 住宅/家宽这类最贵的档位会标到 3x、5x，不属于低倍率。
 *
 * 整数倍率分支用 `(?:^|[^\d.])` 起头，要求倍率数字前面不是数字或小数点，
 * 保证匹配的是完整的倍率数值，而不是更长数字里的一段。
 */
export const LOW_COST_NODE_MATCHER = createCaseInsensitiveNodeMatcher(
    String.raw`0\.[0-5]|低倍率|省流|实验性|(?:^|[^\d.])1x`
);
