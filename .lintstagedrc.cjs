const path = require("path");

const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(" --file ")}`;

// 拡張子が js・jsx・ts・tsx のファイルに対して linter を走らせる
module.exports = {
    "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};