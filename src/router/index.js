import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import NewRecommend from 'components/newRecommend/newRecommend'
import Mine from 'components/mine/mine'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Sort from 'components/sort/sort'
Vue.use(Router)
// 路由组件
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend' // 首页
    },
    {
      path: '/recommend',
      // 首页
      component: Recommend
    },
    {
      path: '/newRecommend',
      // 推荐
      component: NewRecommend
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/sort',
      component: Sort
    }

  ]
})
