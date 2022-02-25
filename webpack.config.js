const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './public/src/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.s*[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
          }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
       ]
}