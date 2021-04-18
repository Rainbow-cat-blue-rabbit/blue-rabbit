/*
 * @Author: JaneChelle
 * @Date: 2019-11-07 15:40:18
 * @LastEditTime: 2021-04-18 15:49:37
 * @Description:
 */
// import { commonParams } from './config'
import axios from 'axios'
export function getCdInfo(mid) {
  const url = '/api/getCdInfo'
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
