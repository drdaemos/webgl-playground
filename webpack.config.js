var config = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader'
      }
    ]
  }
}

module.exports = config;