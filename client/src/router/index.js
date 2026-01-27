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
    path: '/pengadaan',
    name: 'pengadaan',
    component: () => import('../views/pengadaan/pengadaan.vue'),
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
    path: '/p_jalanIrigasi',
    name: 'p_jalanIrigasi',
    component: () => import('../views/pengadaan/p_jalanIrigasi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/p_asetTetap',
    name: 'p_asetTetap',
    component: () => import('../views/pengadaan/p_asetTetap.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/p_konstruksi',
    name: 'p_konstruksi',
    component: () => import('../views/pengadaan/p_konstruksi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/p_asetLainnya',
    name: 'p_asetLainnya',
    component: () => import('../views/pengadaan/p_asetLainnya.vue'),
    beforeEnter: isLoggedIn,
  },



  {
    path: '/tanah',
    name: 'tanah',
    component: () => import('../views/penatausahaan/tanah.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/asetLainnya',
    name: 'asetLainnya',
    component: () => import('../views/penatausahaan/asetLainnya.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/asetTetapLainnya',
    name: 'asetTetapLainnya',
    component: () => import('../views/penatausahaan/asetTetapLainnya.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/gedungBangunan',
    name: 'gedungBangunan',
    component: () => import('../views/penatausahaan/gedungBangunan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/jalanIrigasi',
    name: 'jalanIrigasi',
    component: () => import('../views/penatausahaan/jalanIrigasi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/konstruksi',
    name: 'konstruksi',
    component: () => import('../views/penatausahaan/konstruksi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/peralatanMesin',
    name: 'peralatanMesin',
    component: () => import('../views/penatausahaan/peralatanMesin.vue'),
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
