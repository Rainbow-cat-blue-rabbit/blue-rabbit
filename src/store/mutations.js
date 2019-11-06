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
  [types.SET_DISC_LIST](state, discList) {
    state.discList = discList
  }
}
export default mutations
