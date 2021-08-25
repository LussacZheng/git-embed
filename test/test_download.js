'use strict'

const path = require('path')

const { download } = require('../src/network/download')

const urls = [
  'https://s2.ax1x.com/2019/08/17/muTbIs.th.gif',
  'https://s2.ax1x.com/2019/08/17/muTbIs.md.gif',
  'https://s2.ax1x.com/2019/08/17/muTbIs.gif',
  'https://img-blog.csdnimg.cn/20190817195806927.gif',
  'http://img-arch.pconline.com.cn/images/upload/upc/tx/wallpaper/1209/04/c0/13594204_1346729315999.jpg',
  'https://www.baidu.com/img/pc_1c6e30772d5e4103103bd460913332f9.png',
  'https://raw.githubusercontent.com/LussacZheng/video-downloader-deploy/master/res/7za.exe',
]

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

;(async () => {
  const url = urls[random(0, urls.length)]
  await download(url, path.resolve(__dirname, './temp/'))
})()
