var webpack = require("webpack");

module.exports = {
  entry: {
    "eg.component": "./src/index.js",
    "eg.component.min": "./src/index.js",
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
        test: /\.js$/,
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