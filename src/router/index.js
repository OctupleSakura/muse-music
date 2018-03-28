import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/firstLevelPage/Index'
import player from '@/page/firstLevelPage/player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/player/:songmid/:albummid',
      name:'player',
      component:player
    }
  ]
})
