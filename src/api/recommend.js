/*
 * @Author: JaneChelle
 * @Date: 2019-10-24 14:53:02
 * @LastEditTime: 2021-04-19 15:56:04
 * @Description:
 */
// import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'
export function getRecommend() {
  const url = '/api/getSlider'
  const data = Object.assign({}, {})
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19,
    rnd: Math.random()
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 官方歌单
export function getPlayList() {
  const url = '/api/getPlayList'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { 'comm': { 'ct': 24 }, 'playlist': { 'method': 'get_playlist_by_category', 'param': { 'id': 3317, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 3317 }, 'module': 'playlist.PlayListPlazaServer' } }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 达人歌单
export function getRePlaylist() {
  const url = '/api/getRePlaylist'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { 'comm': { 'ct': 24 }, 'recomPlaylist': { 'method': 'get_hot_recommend', 'param': { 'async': 1, 'cmd': 2 }, 'module': 'playlist.HotRecommendServer' } }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 新碟
export function getNewAlbum() {
  const url = '/api/getNewAlbum'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { 'new_album': { 'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_info', 'param': { 'area': 1, 'start': 0, 'num': 20 } }, 'new_album_tag': { 'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_area', 'param': {} }, 'comm': { 'ct': 24, 'cv': 0 } }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
