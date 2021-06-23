// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

var axios = require('axios')
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.baseURL = 'http://localhost:8443/api'
// 让前端能够带上 cookie，我们需要通过 axios 主动开启 withCredentials 功能
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

// router.beforeEach()，意思是在访问每一个路由前调用
router.beforeEach((to, from, next) => {
  // console.log('to.path:' + to.path)
  // console.log('store.state' + store.state.username)
  if (store.state.username && to.path.startsWith('/admin')) {
    // console.log('initAdminMenu')
    initAdminMenu(router, store)
  }
  if (store.state.username && to.path.startsWith('/login')) {
    next({
      name: 'Dashboard'
    })
  }
  if (to.meta.requireAuth) {
    if (store.state.username) {
      axios.get('/authentication').then(resp => {
        console.log(resp)
        if (resp.data) {
          next()
        }
      })
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

// 初始化菜单
const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    // console.log('menuResp===>:' + resp)
    if (resp && resp.status === 200) {
      // console.log('menu===>:' + resp)
      var fmtRoutes = formatRoutes(resp.data.result)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

// 把接口返回的路由信息，格式化
const formatRoutes = (routes) => {
  console.log(routes)
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
