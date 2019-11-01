import { commonParams } from './config'
 import axios from 'axios'
export function getSingerList () {
  const url = '/api/getSingerList'
  const data = Object.assign({}, commonParams, {
    g_tk: 87063419,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'comm': {'ct': 24, 'cv': 0}, 'singerList': {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1}}}
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 歌手详情
export function getSingerDetail (singerMid) {
  const url = '/api/getSingerDetail'
  const data = Object.assign({}, commonParams, {
    g_tk: 499021157,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'comm': {'ct': 24, 'cv': 0}, 'singerSongList': {'method': 'GetSingerSongList', 'param': {'order': 1, 'singerMid': `${singerMid}`, 'begin': 0, 'num': 10}, 'module': 'musichall.song_list_server'}}
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
