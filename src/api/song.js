import { commonParams } from './config'
import axios from 'axios'
export function getLyric (mid) {
  const url = '/api/getLyric'
  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(), // + 相当于把这个时间对象做了隐士的类型转换  该元素转换成Number类型 等同于Date.prototype.getTime()
    songmid: mid,
    g_tk: 1470240816,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
