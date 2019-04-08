const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {dependencies} = require('./package.json');
const Webpack = require('webpack');
const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: path.resolve(__dirname, 'src/main.js')     // 入口
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[chunkhash:8].js'     //出口 打包的文件名
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'assets/images'),
      '@fonts': path.resolve(__dirname, 'assets/fonts'),
      '@components': path.resolve(__dirname, 'components')
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
            presets: ['@babel/preset-env'],                       //js语法编译
            plugins: ['@babel/plugin-syntax-dynamic-import']      //import()语法支持
          }
        }
      },
      {
        test: /\.(jpg|png|gif|svg)$/,       //图片文件
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images',
            name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]'
          }
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,      //字体文件
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts',
            name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]'
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
        `https://cdn.bootcss.com/vue/${dependencies.vue.substr(1)}/vue.min.js`,
        `https://cdn.bootcss.com/vue-router/${dependencies['vue-router'].substr(1)}/vue-router.min.js`,
        `https://cdn.bootcss.com/element-ui/${dependencies['element-ui'].substr(1)}/index.js`
      ],
      minify: {
        collapseWhitespace: true      //压缩html代码，去掉空格
      }
    }),
    new CleanWebpackPlugin('dist'),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'     //CSS代码分离压缩
    }),
    new Webpack.DefinePlugin({
      'WEBPACK_MODE': JSON.stringify(devMode ? 'development' : 'production')    //定义全局变量
    }),
    new Webpack.ProvidePlugin({
      // 如果你遇到了至少一处用到 lodash 变量的模块实例，那请你将 lodash package 包引入进来，并将其提供给需要用到它的模块。
      // _: 'lodash'
      _join: 'lodash/join'      //值：路径（只打包特定的模块）
    })
  ],
  devtool: devMode ? 'eval' : 'source-map',
  // 想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用
  externals: devMode ? {} : {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT'
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 88,
    proxy: {
      '/api': {
        target: process.env.DEV_SERVER || 'http://localhost:8080',
        pathRewrite: {'^/api': ''}
      }
    }
  }
};