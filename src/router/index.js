import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/Appindex'
import Login from '../components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register')
    }
  ]
})
