import Vue from 'vue'
import Router from 'vue-router'
import Clippy from '@/components/clippy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Clippy
    }
  ]
})
