/*
 * @Author: JaneChelle
 * @Date: 2019-11-11 20:36:37
 * @LastEditTime: 2021-04-18 16:22:11
 * @Description:
 */
import { commonParams } from './config'
import axios from 'axios'
export function getAlbumSongList(mid) {
  const url = '/api/getAlbumSongList'
  const data = Object.assign({}, {
    mid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
