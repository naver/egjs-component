var pkg = require("../package.json");
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
	entry: {
		"component": "./src/index.js",
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library: [pkg.namespace.eg, "Component"],
		libraryTarget: "umd",
	},
	devServer: {
		publicPath: "/dist/"
	},
	devtool: "source-map",
	module: {
		rules: [{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					"presets": [
						[
							"es2015",
							{
								"loose": true
							}
						]
					],
					"plugins": [
						"add-module-exports",
						"transform-es3-property-literals",
        		"transform-es3-member-expression-literals"
					]
				}
			},
			{
				test: /(\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /#__VERSION__#/ig,
						replacement: function (match, p1, offset, string) {
							return pkg.version;
						}
					}]
				})
			}
		]
	},
	plugins: [new StringReplacePlugin()]
};
