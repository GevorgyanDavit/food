const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/js/index.js",
    output: {
        filename: "all.js",
        path: path.resolve(__dirname, "dist/js/"),
    },
    plugins: [
		new HtmlWebpackPlugin(
			{ 
				template: './src/index.html', 
				filename: "../index.html",
				minify: true
			}
		)
	],
	watch: true
};