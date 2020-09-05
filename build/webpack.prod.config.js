/**生产环境配置档 */
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'static/js/[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
    }),
  ],
});