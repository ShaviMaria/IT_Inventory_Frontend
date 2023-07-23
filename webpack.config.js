const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack');

const ruleForJavaScript = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic' //clasic
                }
            ]
        ]
    }
}

const ruleForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

const ruleForPictures = {
    test: /\.(png|jpe?g|gif|webp)$/i,
    type: 'asset/resource',
}

const rules = [ruleForJavaScript, ruleForStyles, ruleForPictures]

module.exports = {

    entry: './src/index.js',
    output: {
        //filename: isProduction ? '[name].[contenthash].js' : 'main.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'public/index.html'}),
        new HotModuleReplacementPlugin()
    ],
    module: {
        rules
    },
    devServer: {
        open: true,
        port: 3000,
        compress: true
    },
    devtool: 'source-map'

}