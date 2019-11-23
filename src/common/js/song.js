import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
  // 封装对象
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.singer = singer
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}
// 工厂方法
export function createSong (songInfo, songVkey) {
  return new Song({
    id: songInfo.id,
    mid: songInfo.mid,
    name: songInfo.name,
    singer: filterSinger(songInfo.singer),
    album: songInfo.album.name,
    duration: songInfo.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songInfo.album.mid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${songVkey}`
  })
}
export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
