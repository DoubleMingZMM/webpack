const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: {
        index:'./src/index.js'
        //print:'./src/print.js'
    },
    output: {
        filename: '[name].bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',//定位原文件错误，直接定位到原文件，不会在打包文件中显示
    devServer: {//会自动刷新，使用npm start
        contentBase: './dist',//告诉dev server应该查找那个地方的文件
        hot:true//用来开启HMR
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({//HtmlWebpackPlugin会生成一个新的模板替换
            title: 'Output Management'
        }),
        new CleanWebpackPlugin(['dist']),//清空dist文件夹中上次打包的文件，会清空所有文件，但是HtmlWebpackPlugin会生成一个新的模板替换
        new webpack.HashedModuleIdsPlugin({//以hash文件显示后缀名，结合filename一起
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new webpack.NamedModulesPlugin(),//以便更容易查看要修补(patch)的依赖
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ],
};