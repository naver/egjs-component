var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: {
    "eg.component": "./src/index.js",
    "eg.component.min": "./src/index.js",
    "eg.component.test": "./test/index.js",
  },
  devtool: "source-map",
  output: {
    path: './dist',
    filename: '[name].js',
    library: "eg",
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: [path.join(__dirname, 'src/'), path.join(__dirname, 'test/')],
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
