import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import autoprefixer from 'autoprefixer'

const paths = {
  src: {
    assets: 'src/_assets/',
    js: 'src/_assets/js/'
  },
  dist: {
    assets: 'dist/assets/'
  }
}

export default {
  entry: {
    main: path.resolve(__dirname, paths.src.js, 'main.js'),
    gallery: path.resolve(__dirname, paths.src.js, 'gallery.js'),
    datatables: path.resolve(__dirname, paths.src.js, 'datatables.js')
  },
  output: {
    path: path.resolve(__dirname, paths.dist.assets),
    filename: 'js/[name].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
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
    new CleanWebpackPlugin(paths.dist.assets),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, paths.src.assets, 'icons'),
      to: path.resolve(__dirname, paths.dist.assets, 'icons')
    }]),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
  ]
}