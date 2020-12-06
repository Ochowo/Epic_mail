const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const uglifyPlugin = new UglifyJsPlugin({
  exclude: /node_modules/,
  cache: true,
  parallel: true,
  sourceMap: true,
});
module.exports = merge(common, {
  mode: 'production',
  plugins: [uglifyPlugin],
});
