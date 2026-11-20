export default {
    extends: ["@commitlint/config-conventional"],
    // npm version 自动生成的提交只有版本号，无需符合约定式提交
    // 同时允许本地版本线 <上游版本>-local.<n>
    ignores: [(commit) => /^v?\d+\.\d+\.\d+(-local\.\d+)?$/.test(commit)],
};
