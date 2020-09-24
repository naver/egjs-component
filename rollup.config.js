const buildHelper = require("@egjs/build-helper");

const name = "eg.Component";

export default buildHelper([
  {
    name,
    input: "./src/Component.ts",
    output: "./dist/component.js",
    format: "umd",
  },
  {
    name,
    input: "./src/Component.ts",
    output: "./dist/component.min.js",
    format: "umd",
    uglify: true,
  },
  {
    input: "./src/Component.ts",
    output: "./dist/component.esm.js",
    format: "esm",
    exports: "named",
  },
]);
