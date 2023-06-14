/* eslint-disable no-console */

import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import MomentLocalesPlugin from 'moment-locales-webpack-plugin'
import merge from 'webpack-merge'
import webpack from 'webpack'

import config from './config'

const ROOT_PATH = process.cwd()
const OUTPUT_PATH = path.join(ROOT_PATH, 'dist')
const SRC_PATH = path.join(ROOT_PATH, 'src')
const PUBLIC_PATH = path.join(ROOT_PATH, 'public')
const STATS_FILEPATH = path.join(OUTPUT_PATH, 'stats/webpack.stats.json')
const DEV_SERVER_PORT = 8080
const IS_DEV = process.env.npm_lifecycle_event.startsWith('start')

const common = {
  entry: {
    polyfill: path.join(SRC_PATH, 'polyfill.js'),
    app: path.join(SRC_PATH, 'app.jsx')
  },
  output: {
    filename: '[name].[hash].js',
    path: OUTPUT_PATH,
    publicPath: config.webApp.path
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['extracted-loader'].concat(
          ExtractTextPlugin.extract({
            filename: IS_DEV ? '[name].css' : '[name].[chunkhash].css',
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          })
        )
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([OUTPUT_PATH], {
      root: ROOT_PATH
    }),
    new ExtractTextPlugin(IS_DEV ? '[name].css' : '[name].[chunkhash].css'),
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_PATH, 'index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: PUBLIC_PATH,
        to: ''
      }
    ]),
    new MomentLocalesPlugin()
  ],
  devtool: 'source-map'
}

const development = {
  devServer: {
    historyApiFallback: {
      index: `${config.webApp.path}/index.html`
    },
    inline: true,
    port: DEV_SERVER_PORT,
    stats: 'errors-only',
    open: true,
    openPage: `${config.webApp.path}`.substr(1),
    hot: true
  },
  mode: 'development',
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
}

const mock = {
  devServer: {
    proxy: {
      [config.bff.api.path]: {
        target: config.bffMock.url,
        pathRewrite: {
          [`^${config.bff.api.path}`]: '/api'
        }
      },
      [config.auth.api.path]: {
        target: config.authMock.url,
        pathRewrite: {
          [`^${config.auth.api.path}`]: '/'
        }
      }
    }
  }
}

const production = {
  mode: 'production'
}

const stats = {
  plugins: [
    new BundleAnalyzerPlugin({
      statsFilename: STATS_FILEPATH
    })
  ]
}

function buildConfig(environment) {
  switch (environment) {
    case 'build':
      console.log('Applying webpack configs: common, production')
      return merge(common, production)
    case 'build:stats':
      console.log('Applying webpack configs: common, production, stats')
      return merge(common, production, stats)
    case 'start':
      console.log('Applying webpack configs: common, development')
      return merge(common, development)
    case 'start:mock':
      console.log('Applying webpack configs: common, development, mock')
      return merge(common, development, mock)
    default:
      return common
  }
}

// Use npm_lifecycle_event to determine environment,
// this is script context specific
module.exports = buildConfig(process.env.npm_lifecycle_event)
