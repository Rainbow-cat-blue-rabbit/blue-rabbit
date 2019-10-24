export default class Picture {
  constructor({id, name, time}) {
    this.pic_mid = id
    this.name = name
    this.release_time = time
    this.pic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${id}.jpg?max_age=2592000`
  }
}
