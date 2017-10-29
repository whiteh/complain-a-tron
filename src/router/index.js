import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Email from '@/components/Email'
import DodgyTextBox from '@/components/DodgyTextBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/Email',
      name: 'Email',
      component: Email
    },
    {
      path: '/issue',
      name: 'issue',
      component: DodgyTextBox
    }
  ]
})
