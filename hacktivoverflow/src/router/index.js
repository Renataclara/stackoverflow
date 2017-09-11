import Vue from 'vue'
import Router from 'vue-router'
import signup from '@/components/signup'
import signin from '@/components/signin'
import home from '@/components/home'
import mainlist from '@/components/mainlist'
import subquestion from '@/components/subquestion'

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
      name: 'signin',
      component: signin
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: '',
          component: mainlist
        },
        {
          path: ':id',
          component: subquestion,
          props: true
        }
      ]
    }
  ]
})
