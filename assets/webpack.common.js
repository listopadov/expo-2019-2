const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = '../outer';

module.exports = {
  entry: {
    main: './assets/js/pages/main.js',

    polyfills: './assets/js/modules/polyfills.js',
  },

  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, dist),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      'ie >= 10',
                      'iOS >= 8',
                      'Safari >= 8',
                      'last 4 version',
                    ],
                  }),
                ],
              },
            },
            {
              loader: 'group-css-media-queries-loader'
            },
            {
              loader: 'sass-loader'
            },
          ],
        }),
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'outer/'
            }
          }
        ]
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: './css/styles.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: './js/commons.js',
      minChunks: 2,
    }),
  ],

  stats: {
    children: false,
    chunks: false,
    modules: false,
  },
};
