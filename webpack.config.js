const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    main: './frontend/js/main.js',
    test: './frontend/js/test.js',
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name][hash].js',
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.html',
      chunks: ['main'],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000,
  },
};
