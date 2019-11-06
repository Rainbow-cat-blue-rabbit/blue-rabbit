import { commonParams } from './config'
import axios from 'axios'
export function getCdList (disstid) {
  const url = '/api/getCdList'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: `${disstid}`,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
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
