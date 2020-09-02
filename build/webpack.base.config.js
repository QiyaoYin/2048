const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    context: path.resolve(__dirname,'../'),
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'static/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.vue','.js','.json'],
        alias: {
            '@': path.resolve(__dirname,'../src'),
            'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compiler: require('vue-template-compiler'),
                    compilerOptions: {
                        whitespace: 'preseve',
                    }
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i, //i 表示 不区分大小写
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,//8192B = 8KB
                        name: 'static/img/[name].[ext]',//配置 url-loader 将上限内的资源转换为 Base64 编码(data file)，超过上限的资源则直接给file 文件
                        esModule: false
                      },
                    },
                  ],
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            //favicon: './public/favicon.ico',
        }),
    ],
    optimization: {
        runtimeChunk: {//配置 runtimeChunk 将 Webpack 运行时代码抽离成独立文档
          name: 'manifest',
        },
        splitChunks: {//配置 SplitChunksPlugin 将 node_modules 内的套件抽离成独立档案（文档），代码分离允许你把代码拆分到多个文件中。如果使用得当，你的应用性能会提高很多。因为浏览器能缓存你的代码。
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              name: 'vendors',
              enforce: true,
            },
            default: false,
          },
        },
    },
}