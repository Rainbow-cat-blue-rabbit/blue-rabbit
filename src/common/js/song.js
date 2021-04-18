/*
 * @Author: JaneChelle
 * @Date: 2019-10-29 15:32:40
 * @LastEditTime: 2021-04-18 21:06:16
 * @Description:
 */
import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
  // 封装对象
  constructor({ singerId, musicId, singerName, musicName, image, audio }) {
    this.singerId = singerId
    this.musicId = musicId
    this.musicName = musicName
    this.singerName = singerName
    // this.duration = duration
    this.image = image
    this.audio = audio
  }
  getLyric() {
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
export function createSong(songInfo) {
  return new Song({
    singerId: songInfo.singerId,
    musicId: songInfo.musicId,
    musicName: songInfo.musicName,
    singerName: songInfo.singerName,
    // duration: songInfo.duration,
    image: songInfo.musicImages,
    audio: songInfo.audio
  })
}
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.singerName)
  })
  return ret.join('/')
}
