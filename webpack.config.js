const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* config */
const cssInput = './src/sass/style.scss';
const cssOutput = 'styles.css';

const jsInput = './src/js/index.js';
const jsOutput = 'bundle.js';

/* webpack config */
module.exports = {
  entry: [jsInput, cssInput],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: cssOutput})
  ],
  output: {
    filename: jsOutput,
    path: path.resolve(__dirname, 'dist')
  }
};