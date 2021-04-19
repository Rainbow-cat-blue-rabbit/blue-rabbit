/*
 * @Author: JaneChelle
 * @Date: 2021-04-19 15:07:13
 * @LastEditTime: 2021-04-19 17:05:06
 * @Description: 收藏或取消
 */
import axios from 'axios'
export function collect(musicId) {
  const url = 'http://localhost:10019/collect/collect'
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
