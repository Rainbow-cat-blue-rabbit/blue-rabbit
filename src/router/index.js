import Vue from 'vue'
import Cube from 'cube-ui'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import NewRecommend from 'components/newRecommend/newRecommend'
import Mine from 'components/mine/mine'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
// import Sort from 'components/sort/sort'
import OfficialMore from 'components/Official-more/Official-more'
import Doyen from 'components/doyen/doyen'
import LatestAlbum from 'components/latest-album/latest-album'
import SingerDetail from 'components/singer-detail/singer-detail'
import TopList from 'components/top-list/top-list'
// import SortDetail from 'components/sort-detail/sort-detail'
import OfficialDetail from 'components/official-detail/official-detail'
import DoyenDetail from 'components/doyen-detail/doyen-detail'
import LatestDetail from 'components/latest-detail/latest-detail'
import Login from 'components/login/login'
Vue.use(Router)
Vue.use(Cube)
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
      component: Recommend,
      children: [
        {
          path: '/recommend/OfficialDetail/:tid',
          name: 'official-detail',
          component: OfficialDetail
        },
        {
          path: '/recommend/DoyenDetail/:content_id',
          name: 'doyen-detail',
          component: DoyenDetail
        },
        {
          path: '/recommend/LatestDetail/:mid',
          name: 'latest-detail',
          component: LatestDetail
        }
      ]
    },
    {
      path: '/newRecommend',
      // 推荐
      component: NewRecommend
    },
    {
      path: '/mine',
      // 个人中心
      component: Mine
    },
    {
      path: '/singer',
      // 歌手
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/search',
      // 搜索
      name: 'Search',
      component: Search,
      children: [
        {
          path: ':id',
          name: 'SearchDetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      // 排行
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    // {
    //   path: '/sort',
    //   // 分类
    //   component: Sort,
    //   children: [
    //     {
    //       path: ':id',
    //       component: SortDetail
    //     }
    //   ]
    // },
    {
      path: '/Official-more',
      // 官方
      component: OfficialMore,
      children: [
        {
          path: '/Official-more/:tid',
          name: 'official-details',
          component: OfficialDetail
        }
      ]
    },
    {
      // 达人
      path: '/doyen',
      component: Doyen,
      children: [
        {
          path: '/doyen/:id',
          component: DoyenDetail
        }
      ]
    },
    {
      // 最新专辑
      path: '/latestAlbum',
      component: LatestAlbum,
      children: [
        {
          path: '/latestAlbum/:id',
          component: LatestDetail
        }
      ]
    }
  ]
})
