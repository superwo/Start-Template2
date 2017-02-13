module.exports = {
  entry: './app/js/scripts/App.js',
  output: {
    path: './app/js',
    filename: 'common.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
      test: /\.js$/,
      exclude: /node_modules/
    }]
  }
}
