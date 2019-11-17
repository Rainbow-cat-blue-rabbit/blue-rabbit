// 映射， 从getters取数据到组件中
export const singer = state => state.singer
export const topList = state => state.topList
export const discList = state => state.discList
export const playList = state => state.playList
export const rePlaylist = state => state.rePlaylist
export const newAlbum = state => state.newAlbum
// 播放器参数
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex

// getters里面也可以有计算属性
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
