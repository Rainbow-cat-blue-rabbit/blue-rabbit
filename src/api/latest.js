import { commonParams } from './config'
import axios from 'axios'
export function getAlbumSongList (albumMid) {
  const url = '/api/getAlbumSongList'
  const data = Object.assign({}, commonParams, {
    g_tk: 2065505414,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'comm': {'ct': 24, 'cv': 10000}, 'albumSonglist': {'method': 'GetAlbumSongList', 'param': {'albumMid': `${albumMid}`, 'albumID': 0, 'begin': 0, 'num': 10, 'order': 2}, 'module': 'music.musichallAlbum.AlbumSongList'}}
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
