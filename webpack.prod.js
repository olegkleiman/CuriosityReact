const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env')
})

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            RECOMMENDER_HOST_PROTOCOL: JSON.stringify(process.env.RECOMMENDER_HOST_PROTOCOL),
            RECOMMENDER_HOST: JSON.stringify(process.env.RECOMMENDER_HOST),
            VAPI_PUBLIC_KEY: JSON.stringify(process.env.VAPI_PUBLIC_KEY),
            GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID)
        })
    ],
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },    
    entry: {
        bundle: ["@babel/polyfill", path.resolve(__dirname, './src/index.js')]
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },    
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',             
            ]
        }      
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    performance: {
        hints: false
    },
    output: {
        path: __dirname + '/public'
    },
    devtool: 'hidden-source-map'
}