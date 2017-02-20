var config = {
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
        }
      ]
    }
}

module.exports = config;