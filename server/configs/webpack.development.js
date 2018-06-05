import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


export default {
  mode: process.env.NODE_ENV,
  devtool: "cheap-module-source-map",
  entry: {
    client: ["@babel/polyfill", "react-hot-loader/patch", "webpack-hot-middleware/client", "./client/client"]
  },
  output: {
    path: path.join(__dirname, "..", "..", "build", "bundle"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFilename: "[name].js",
    publicPath: "/bundle/"
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
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
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
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
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
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
  },
  optimization: {
    minimize: false,
    splitChunks: false
  }
};
