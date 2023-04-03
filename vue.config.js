module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/beltel-project/' : '/',
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: 'http://www.tvr.by',
  },
}
