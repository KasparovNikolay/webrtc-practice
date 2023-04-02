/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path')

const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (env, argv) {
  const isDev = argv.mode === 'development'

  return {
    mode: isDev ? 'development' : 'production',
    entry: './src/main.tsx',
    watchOptions: {
      poll: true,
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[fullhash:8].chunks.js',
      publicPath: '/',
      clean: true,
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      open: true,
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      watchFiles: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.scss'],
      historyApiFallback: true,
      compress: true,
      port: 3000,
      client: {
        overlay: true,
        progress: true,
      },
    },
    performance: {
      maxEntrypointSize: 3_145_728,
      maxAssetSize: 6_291_456,
    },
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(js|ts)x?$/, // add |ts
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[folder]-[local]-[hash:base64:5]' : '[hash:base64:6]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['autoprefixer']],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@ui': path.resolve(__dirname, 'src/components/ui-components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: './assets/index.html',
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
        },
      }),
      new MiniCssExtractPlugin(),
    ],
  }
}
