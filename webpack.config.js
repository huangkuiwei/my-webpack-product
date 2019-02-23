const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {dependencies} = require('./package.json');
const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    // 默认 main: path.resolve(__dirname, 'src/index.js')
    app: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    filename: devMode ? '[name].js' : '[name].js?[chunkhash:8]'
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,     //CSS剥离js插件
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1                //默认：0  css-loader之前的loader数量
            }
          },
          {
            loader: 'postcss-loader',         //postcss-loader
            options: {
              plugins: [
                require('postcss-nested'),    //CSS嵌套写法支持
                require('autoprefixer'),      //打包时自动添加浏览器前缀
                require('postcss-clean')      //CSS压缩插件
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
            name: devMode ? '[name].[ext]' : '[name].[ext]?[hash:8]'
          }
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      bodyHtmlSnippet: '<div id="app"></div>',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no'
        }
      ],
      scripts: devMode ? [] : [
        `https://cdn.bootcss.com/vue/${dependencies.vue.substr(1)}/vue.min.js`
      ],
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin('dist'),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css?[hash:8]'
    })
  ],
  devtool: devMode ? 'eval' : 'source-map',
  externals: devMode ? {} : {
    vue: 'Vue'
  },
  devServer: {
    host: 'localhost',
    port: '9999'
  }
};