 import axios from 'axios'
 import {commonParams} from './config'
 export function search (query, page, zhida, perpage) {
   const url = '/api/search'
   const data = Object.assign({}, commonParams, {
     platform: 'h5',
     needNewCode: 1,
     w: query,
     zhidaqu: 1,
     catZhida: zhida ? 1 : 0,
     perpage,
     n: perpage,
     t: 0,
     flag: 1,
     ie: 'utf-8',
     sem: 1,
     aggr: 0,
     p: page,
     remoteplace: 'txt.mqq.all'
   })
   return axios.get(url, {
     params: data
   }).then((res) => {
     return Promise.resolve(res.data)
   }).catch((error) => {
     console.log(error)
   })
 }
