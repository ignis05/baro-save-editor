module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/baro-save-editor/' : '/',
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Barotrauma Save Editor'
      return args
    })
  },
}
