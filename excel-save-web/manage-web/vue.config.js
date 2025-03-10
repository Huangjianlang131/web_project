const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const webpack = require('webpack')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = {
    lintOnSave: false,
    publicPath: '/',
    configureWebpack: config => {
        config.devtool = 'source-map'
        if (isProduction) {
            config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@view', resolve('src/views'))
    },
    devServer: {
        open: false,
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    // devServer: {
    // proxy: {
    // "/ksai": {
    // target: "http://10.241.252.207:9089/", // 设置你的API接口地址
    // changeOrigin: true, // 允许跨域
    // pathRewrite: {
    // "^/ksai": "/ksai", // 将'/api'替换为空字符串，请求地址中不再包含'/api'
    // },
    // },
    // },
    // },
    productionSourceMap: false,
    lintOnSave: true,

    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        hack: `true; @import "${path.resolve(__dirname, 'src/assets/css/global.less')}";`
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
}