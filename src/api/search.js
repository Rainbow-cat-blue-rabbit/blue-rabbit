 import axios from 'axios'
//  import {commonParams} from './config'
export function search(keyword) {
   const url = '/api/search'
   const data = Object.assign({}, {
     keyword
   })
   return axios.get(url, {
     params: data
   }).then((res) => {
     return Promise.resolve(res.data)
   }).catch((error) => {
     console.log(error)
   })
 }
