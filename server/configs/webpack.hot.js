import config from "./webpack.development";

export default {
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 0
  },
  stats: {
    colors: false,
    assets: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    version: true
  }
};
