import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/firstLevelPage/Index'
import player from '@/page/firstLevelPage/player'
import login from '@/page/firstLevelPage/login'
import songSheet from '@/page/firstLevelPage/songSheet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/player/:songmid/:albummid/:songid/:init',
      name:'player',
      component:player
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/songSheet',
      name:'songSheet',
      component:songSheet
    }
  ]
})
