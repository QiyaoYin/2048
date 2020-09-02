const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig,{
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 9000,
        open: true, 
        clientLogLevel: 'warn',
        compress: true, 
        overlay: true, 
        stats: 'errors-only',
        hot: true,
    },
    module: {
        rules: [
            {
              test: /\.styl(us)?$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',//配置 css-loader 將 CSS 透過 @import 或 url() 的方式載入到 JavaScript 內
                  options: {
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',//它负责进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等。
                  options: {
                    sourceMap: true,
                  },
                },
                {
                  loader: 'stylus-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            },
        ],
    }
});