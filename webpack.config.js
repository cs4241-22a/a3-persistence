const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/scripts.js',
    // module: {
    //     rules: [
    //         {
    //             test: /\.ts?$/,
    //             use: 'ts-loader',
    //             exclude: /node_modules/
    //         }
    //     ]
    // },
    // resolve: {
    //     extensions: ['.tsx', '.ts', '.js'],
    // },
    output: {
        path: path.resolve(__dirname, './src/dist'),
        filename: 'index.bundle.js',
    },
};