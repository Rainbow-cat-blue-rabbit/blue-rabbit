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
    url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/${songVkey}`
  })
}

 function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
