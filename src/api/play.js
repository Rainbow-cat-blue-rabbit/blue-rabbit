/*
 * @Author: JaneChelle
 * @Date: 2021-04-18 17:21:23
 * @LastEditTime: 2021-04-19 17:05:38
 * @Description:
 */
import axios from 'axios'
export function play(musicId) {
  const url = 'http://localhost:10019/music/play'
  const data = Object.assign({}, {
    musicId
  })
  return axios.get(url, {
    headers: {
      token: localStorage.getItem('Authorization')
    },
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
