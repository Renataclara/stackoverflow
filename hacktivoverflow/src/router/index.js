import Vue from 'vue'
import Router from 'vue-router'
import signup from '@/components/signup'
import signin from '@/components/signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/signin',
      name: 'signup',
      component: signin
    }
  ]
})
