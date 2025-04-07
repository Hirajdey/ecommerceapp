// webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'public'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Development-specific loaders can be added here
    ],
  },
  plugins: [
    // Development-specific plugins can be added here
  ],
});
