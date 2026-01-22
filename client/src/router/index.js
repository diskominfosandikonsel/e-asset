import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);





function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}










  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
    beforeEnter: loggedInRedirectDashboard,
  },



  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isLoggedIn,
  },


 
  {
    path: '/menuList',
    name: 'menuList',
    component: () => import('../views/dataMaster/menuList.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/klpUsers',
    name: 'klpUsers',
    component: () => import('../views/dataMaster/klpUsers.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/registrasi',
    name: 'registrasi',
    component: () => import('../views/dataMaster/registrasi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/asalUsul',
    name: 'asalUsul',
    component: () => import('../views/dataMaster/asalUsul.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/hakTanah',
    name: 'hakTanah',
    component: () => import('../views/dataMaster/hakTanah.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/kondisiAset',
    name: 'kondisiAset',
    component: () => import('../views/dataMaster/kondisiAset.vue'),
    beforeEnter: isLoggedIn,
  },



  {
    path: '/p_tanah',
    name: 'p_tanah',
    component: () => import('../views/pengadaan/p_tanah.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/p_peralatanMesin',
    name: 'p_peralatanMesin',
    component: () => import('../views/pengadaan/p_peralatanMesin.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/p_gedungBangunan',
    name: 'p_gedungBangunan',
    component: () => import('../views/pengadaan/p_gedungBangunan.vue'),
    beforeEnter: isLoggedIn,
  },



  {
    path: '/tanah',
    name: 'tanah',
    component: () => import('../views/kartuInventaris/tanah.vue'),
    beforeEnter: isLoggedIn,
  },
  

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: isLoggedIn,
  },


]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
