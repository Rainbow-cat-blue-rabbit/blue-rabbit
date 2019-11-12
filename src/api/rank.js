// import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'
export function getTopList () {
  const url = '/api/getTopList'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'comm': {'ct': 24}, 'category': {'method': 'get_hot_category', 'param': {'qq': ''}, 'module': 'music.web_category_svr'}, 'recomPlaylist': {'method': 'get_hot_recommend', 'param': {'async': 1, 'cmd': 2}, 'module': 'playlist.HotRecommendServer'}, 'playlist': {'method': 'get_playlist_by_category', 'param': {'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8}, 'module': 'playlist.PlayListPlazaServer'}, 'new_song': {'module': 'newsong.NewSongServer', 'method': 'get_new_song_info', 'param': {'type': 5}}, 'new_album': {'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_info', 'param': {'area': 1, 'sin': 0, 'num': 10}}, 'new_album_tag': {'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_area', 'param': {}}, 'toplist': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetAll', 'param': {}}, 'focus': {'module': 'QQMusic.MusichallServer', 'method': 'GetFocus', 'param': {}}}
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取排行榜单列表详情
export function getMusicList (topId, period) {
  const url = '/api/getMusicList'
  const data = Object.assign({}, commonParams, {
    g_tk: 2065505414,
    hostUin: 0,
    loginUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'detail': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetDetail', 'param': {'topId': `${topId}`, 'offset': 0, 'num': 20, 'period': `${period}`}}, 'comm': {'ct': 24, 'cv': 0}}
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
