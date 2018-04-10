import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import path from 'path'
import autoprefixer from 'autoprefixer'

export default {
  entry: {
    main: path.resolve(__dirname, 'src/_assets/js/main.js'),
    gallery: path.resolve(__dirname, 'src/_assets/js/gallery.js'),
    datatables: path.resolve(__dirname, 'src/_assets/js/datatables.js'),
    rss: path.resolve(__dirname, 'src/_assets/styles/rss.scss'),
    atom: path.resolve(__dirname, 'src/_assets/styles/atom.scss')
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/'),
    filename: 'js/[name].[chunkhash].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }, {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              autoprefixer()
            ]
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
        }
      }]
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    //new CleanWebpackPlugin('dist/assets'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/_assets/icons'),
      to: path.resolve(__dirname, 'dist/assets/icons')
    }]),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      allChunks: true
    }),
    new ManifestPlugin({
      fileName: '../../src/_data/assets.json'
    }),
  ]
}