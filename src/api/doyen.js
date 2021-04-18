/*
 * @Author: JaneChelle
 * @Date: 2019-11-09 11:39:32
 * @LastEditTime: 2021-04-18 16:13:44
 * @Description:
 */
import { commonParams } from './config'
import axios from 'axios'
export function getDoyenInfo(mid) {
  const url = '/api/getDoyenInfo'
  const data = Object.assign({}, commonParams, {
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
