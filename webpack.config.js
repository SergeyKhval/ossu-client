const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './client'), // for js import paths
      assets: path.resolve(__dirname, './client/assets'), // for scss import paths
    },
  },
}
