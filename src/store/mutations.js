// 定义修改的操作
import * as types from './mutation-types'
// mutation 是一个修改对象的方法， mutatinos里面定义一些修改的方法
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
}
}
export default mutations
