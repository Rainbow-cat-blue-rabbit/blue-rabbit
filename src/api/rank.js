/*
 * @Author: JaneChelle
 * @Date: 2019-10-24 14:53:02
 * @LastEditTime: 2021-04-19 20:42:46
 * @Description:
 */
// import jsonp from 'common/js/jsonp'
// import { commonParams } from './config'
import axios from 'axios'
export function getTopList() {
  const url = '/api/getTopList'
  const data = Object.assign({}, {})
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取排行榜单列表详情
export function getMusicList(type) {
  const url = '/api/getMusicList'
  const data = Object.assign({}, {
    type
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
