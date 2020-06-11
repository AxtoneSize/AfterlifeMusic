import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'components/recommend/Recommend'
import Singer from 'components/singer/Singer'
import Rank from 'components/rank/Rank'
import Search from 'components/search/Search'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
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
      path: '/search',
      component: Search
    }
]

const router = new VueRouter({
  routes
})

export default router
