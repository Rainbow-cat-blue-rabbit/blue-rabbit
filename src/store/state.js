/*
 * @Author: JaneChelle
 * @Date: 2019-10-26 10:49:31
 * @LastEditTime: 2021-04-18 21:31:42
 * @Description:
 */
import { playMode } from '../common/js/config'
const state = {
  singer: {},
  topList: {},
  discList: {},
  playList: {},
  rePlaylist: {},
  newAlbum: {},

  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放索引
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
  isLogin: false
}
export default state
