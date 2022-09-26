const path = require('path');
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")


module.exports = {
    entry: './client.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env", { modules: false }],
                            ["@babel/preset-react", {"runtime": "automatic"}]
                        ],
                        plugins: ["babel-plugin-styled-components"]
                    }
                }
            },
        ]
    },
    plugins: [
        new GoogleFontsPlugin({
            fonts: [
                { family: "Roboto", variants: [ "400" ] }
            ]
        })
    ]

};
