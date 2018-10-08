import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";

const version = require("./package.json").version;
const banner = require("./config/banner");
const merge = require("./config/merge");

const defaultConfig = {
	input: "src/Component.js",
	plugins: [babel(), replace({"#__VERSION__#": version, delimiters: ["", ""]})],
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
		plugins: [
			uglify({
				sourcemap: true,
				output: {
					comments: (node, comment) => {
						const text = comment.value;
						const type = comment.type;

						if (type === "comment2") {
							// multiline comment
							return /@version/.test(text);
						}
						return true;
					},
				},
			}),
		],
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

