const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/* config */
const cssInput = './src/sass/style.scss';
const cssOutput = 'styles.min.css';

const jsInput = './src/js/index.js';
const jsOutput = 'bundle.min.js';

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
          use: ['css-loader?sourceMap,minimize', 'sass-loader?sourceMap,minimize']
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(html|php)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: cssOutput}),
    new UglifyJSPlugin()
  ],
  output: {
    filename: jsOutput,
    path: path.resolve(__dirname, 'dist/built')
  }
};