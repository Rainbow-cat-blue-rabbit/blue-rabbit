/*
 * @Author: JaneChelle
 * @Date: 2021-04-18 17:21:23
 * @LastEditTime: 2021-04-18 17:22:47
 * @Description:
 */
import axios from 'axios'
export function play(musicId) {
  const url = '/api/play'
  const data = Object.assign({}, {
    musicId
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
