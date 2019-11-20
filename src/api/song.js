import { commonParams } from './config'
import axios from 'axios'
export function getLyric (songmid) {
  const url = '/api/getLyric'
  const data = Object.assign({}, commonParams, {
    pcachetime: new Date(),
    songmid: `${songmid}`,
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
