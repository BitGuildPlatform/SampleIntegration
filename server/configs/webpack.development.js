import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";


export default {
	devtool: "cheap-module-source-map",
	entry: {
		client: ["@babel/polyfill", "react-hot-loader/patch", "webpack-hot-middleware/client", "./client/client"]
	},
	output: {
		path: path.join(__dirname, "..", "..", "build", "bundle"),
		filename: "[name].js",
		sourceMapFilename: "[file].map",
		chunkFilename: "[id].js",
		publicPath: "/bundle/"
	},
	resolve: {
		extensions: [".json", ".jsx", ".js"],
		modules: [
			"node_modules"
		]
	},
	module: {
		rules: [{
			test: /\.(le|c)ss$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader",
					options: {
						importLoaders: 1,
						sourceMap: true
					}
				}, {
					loader: "postcss-loader",
					options: {
						sourceMap: true
					}
				}, {
					loader: "less-loader",
					options: {
						sourceMap: true
					}
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
					presets: [
						"@babel/react",
						[
							"@babel/env",
							{
								modules: false,
								targets: {
									browsers: ["last 2 versions"]
								}
							}
						]
					],
					plugins: [
						"react-hot-loader/babel",
						"@babel/proposal-decorators",
						"@babel/proposal-class-properties",
						"@babel/proposal-function-bind",
						"@babel/proposal-object-rest-spread",
						"lodash"
					]
				}
			}]
		}]
	},
	mode: "development",
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: "[name].css",
			allChunks: true
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			"process.env.TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.TOKEN_CONTRACT_ADDR),
			"process.env.TEST_CONTRACT_ADDR": JSON.stringify(process.env.TEST_CONTRACT_ADDR)
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	performance: {
		hints: false
	}
};
