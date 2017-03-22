var webpack = require("webpack");
var path = require('path');

module.exports = {
	entry: {
		"component": "./src/index.js",
		"component.min": "./src/index.js",
		"component.test": "./test/unit/component.spec.js"
		// ,
		// "component.temp": "./temp/index.js"
	},
	output: {
		path: __dirname + "/dist",
		filename: "[name].js",
		library: ["eg", "Component"],
		libraryTarget: "umd"
	},
	devServer: {
		publicPath: "/dist/"
	},
	devtool: "source-map",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			options: {
				presets: ["es2015"]
			}
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		})
	]
};
