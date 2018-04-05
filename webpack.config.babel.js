import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'


export default {
  entry: {
    main: path.resolve(__dirname, 'src/_assets/js/main.js'),
    gallery: path.resolve(__dirname, 'src/_assets/js/gallery.js'),
    datatables: path.resolve(__dirname, 'src/_assets/js/datatables.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/'),
    filename: 'js/[name].js',
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
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          publicPath: '../',
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          publicPath: '../',
        }
      }]
    }]
  },
  plugins: [
    //new CleanWebpackPlugin('dist/assets'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'src/_assets/xslt'),
        to: path.resolve(__dirname, 'dist/assets/xslt')
      },
      {
        from: path.resolve(__dirname, 'src/_assets/icons'),
        to: path.resolve(__dirname, 'dist/assets/icons')
      },
      {
        from: path.resolve(__dirname, 'src/_assets/js/modernizr.js'),
        to: path.resolve(__dirname, 'dist/assets/js/')
      }
    ]),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
  ]
}