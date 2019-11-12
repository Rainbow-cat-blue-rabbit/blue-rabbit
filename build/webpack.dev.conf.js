'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const express = require('express')
const axios = require('axios')
const app = express()
const apiRoutes = express.Router()
app.use('/api', apiRoutes)
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before (app) {
      //  这里使用axios实现ajax请求：axios是一个基于promise的HTTP库，可以用于浏览器和node.js
      // 在浏览器创建XMLHttpRequest对象，从node.js创建http请求
      app.get('/api/getDiscList', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      //官方歌单
      app.get('/api/getPlayList', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      //达人歌单
      app.get('/api/getRePlaylist', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      //新碟
      app.get('/api/getNewAlbum', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/portal/album_lib.html',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 歌手列表
      app.get('/api/getSingerList', function (req, res) {//这里的路径是给前端发送请求的url
          let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/portal/singer_list.html',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 歌手详情
      app.get('/api/getSingerDetail', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 排行
      app.get('/api/getTopList', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 获取排行榜单列表详情
      app.get('/api/getMusicList', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 分类详情
      app.get('/api/getCdList', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 官方详情
      app.get('/api/getCdInfo', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 达人
      app.get('/api/getDoyenInfo', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
      // 最新专辑
      app.get('/api/getAlbumSongList', function (req, res) {//这里的路径是给前端发送请求的url
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // axios发送get请求，可以自己配置config
        axios.get(url, {
          headers: {
            Referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query,
        }).then((response) => {
          res.json(response.data)//返回数据
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'src/common/image/favicon.ico',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
