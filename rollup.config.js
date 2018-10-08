import babel from "rollup-plugin-babel";
import {uglify} from "rollup-plugin-uglify";

const banner = require("./config/banner");
const merge = require("./config/merge");

const defaultConfig = {
	input: "src/index.js",
	plugins: [babel()],
	output: {
		banner,
		format: "es",
		freeze: false,
		exports: "named",
		interop: false,
		sourcemap: true,
	},
};
const entries = [
	{
		output: {
			file: "./dist/component.esm.js",
		},
	}, {
		output: {
			format: "umd",
			name: "eg.Component",
			exports: "default",
			file: "./dist/component.js",
		},
	}, {
		plugins: [uglify({sourcemap: true})],
		output: {
			format: "umd",
			name: "eg.Component",
			exports: "default",
			file: "./dist/component.min.js",
		},
	},
];

export default entries.map(entry => merge(defaultConfig, entry, {
	plugins: "append",
	output: "append",
}));

