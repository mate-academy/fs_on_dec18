const path = require('path');

module.exports = {
  mode: 'none',
  entry: './frontend/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
};
