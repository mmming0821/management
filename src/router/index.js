import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      component: resolve => require(['../pages/login.vue'], resolve)
    }, {
      path: '/readme',
      component: resolve => require(['../pages/home.vue'], resolve),
      children: [
        {
          path: '/table',
          component: resolve => require(['../pages/table.vue'], resolve)
        }, {
          path: '/markdown',
          component: resolve => require(['../pages/markdown.vue'], resolve)
        }
      ]
    }
  ]
})
