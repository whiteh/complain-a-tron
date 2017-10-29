import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Email from '@/components/Email'
import Complaint from '@/components/Complaint'
import Review from '@/components/Review'
import finish from '@/components/finish'
import Recaptcha from '@/components/recaptcha'
import Complaint from '@/components/complaint'

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
      path: '/Complaint',
      name: 'Complaint',
      component: Complaint
    },
    {
      path: '/Review',
      name: 'Review',
      component: Review
    },
    {
      path: '/finish',
      name: 'finish',
      component: finish
    },
    {
      path: '/captcha',
      name: 'captcha',
      component: Recaptcha
    },
    {
      path: '/complaint',
      name: 'complaint',
      component: Complaint
    }

  ]
})
