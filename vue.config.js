module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  // 图⽚压缩 loader 配置
  chainWebpack: config => {
    // 配置图⽚压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  }
}
