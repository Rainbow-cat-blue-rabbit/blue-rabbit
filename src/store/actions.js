// 1.异步  2.封装mutation
import * as types from './mutation-types'
// 当在提交多个mutation时，我们往往会封装一个actions
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SECUENCE_LIST, list)
  commit(types.SET_PLAYLIST1, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
