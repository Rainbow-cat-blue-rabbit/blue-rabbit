/*
 * @Author: JaneChelle
 * @Date: 2021-04-19 15:12:25
 * @LastEditTime: 2021-04-19 17:35:38
 * @Description: 我的收藏列表
 */
import axios from 'axios'
export function select() {
  const url = 'http://localhost:10019/collect/select'
  const data = Object.assign({}, {})
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
