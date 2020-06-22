import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'components/recommend/Recommend'
import Singer from 'components/singer/Singer'
import Rank from 'components/rank/Rank'
import Search from 'components/search/Search'
import SingerDetail from 'components/singerdetail/SingerDetail'
import Disc from 'components/disc/Disc'
import TopList from 'components/toplist/TopList'

const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
]

const router = new VueRouter({
  routes
})

export default router
