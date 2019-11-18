// 定义修改的操作
import * as types from './mutation-types'
// mutation 是一个修改对象的方法， mutatinos 里面定义一些修改的方法
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  // 分类
  [types.SET_DISC_LIST](state, discList) {
    state.discList = discList
  },
  // 官方
  [types.SET_OFFICIAL](state, playList) {
    state.playList = playList
  },
  // 达人
  [types.SET_DOYEN](state, rePlaylist) {
    state.rePlaylist = rePlaylist
  },
  // 最新专辑
  [types.SET_NEWALBUM](state, newAlbum) {
    state.newAlbum = newAlbum
  },

  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SECUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}
export default mutations
