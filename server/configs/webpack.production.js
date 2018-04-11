const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");


module.exports = {
	devtool: "source-map",
	entry: {
		client: ["./client/client"]
	},
	output: {
		path: path.join(__dirname, "..", "..", "build", "bundle"),
		filename: "[name].js",
		sourceMapFilename: "[file].map",
		chunkFilename: "[id].js",
		publicPath: "/bundle/"
	},
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
		Web3: "Web3"
	},
	resolve: {
		extensions: [".json", ".jsx", ".js"],
		modules: [
			"node_modules"
		]
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader"
				}, {
					loader: "postcss-loader"
				}, {
					loader: "less-loader"
				}]
			})
		}, {
			test: /\.(ttf|woff|woff2|eot|svg|gif|png|ico)(\?.+)?$/,
			use: [{
				loader: "file-loader?name=[name].[ext]?[hash]"
			}]
		}, {
			test: /\.jsx?$/,
			exclude: [/node_modules/],
			use: [{
				loader: "babel-loader",
				options: {
					babelrc: false,
					presets: ["@babel/react", [
						"@babel/env",
						{
							targets: {
								browsers: ["last 2 versions"]
							}
						}
					]],
					plugins: [
						"@babel/proposal-decorators",
						"@babel/proposal-class-properties",
						"@babel/proposal-function-bind",
						"@babel/proposal-object-rest-spread",
						"@babel/transform-runtime",
						"lodash"
					]
				}
			}]
		}]
	},
	mode: "production",
	optimization: {
		minimize: true
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].css",
			allChunks: true
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.WHITELIST_CONTRACT_ADDR": JSON.stringify(process.env.WHITELIST_CONTRACT_ADDR),
      "process.env.TEST_CONTRACT_ADDR": JSON.stringify(process.env.TEST_CONTRACT_ADDR)
		}),
		new ProgressBarPlugin()
	],
	performance: {
		hints: false
	}
};
