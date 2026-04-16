const path = require('path');
const { rootPath } = require('./constants');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  rules: [
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      },
    },
    // scss
    {
      test: /\.s?css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]_[hash:base64:5]',
              },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
              sourceMap: true,
              postcssOptions: {
                  plugins: [
                      "autoprefixer",
                  ],
              },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sassOptions: {
                includePaths: ['./common/styles/vars'],
            },
          },
        },
      ],
    },

    // js
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: path.resolve(rootPath, '.etmp/babel-loader'),
        configFile: path.resolve(rootPath, '.babelrc.js'),
      },
    },

    //images
    {
      test: /\.(png|jpe?g|gif|svg|mp4)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
      ],
    },
  ],
};
