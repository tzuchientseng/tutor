// // `npm run deploy` For Github SPA
// import { createRouter, createWebHashHistory } from 'vue-router'
// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [
//     { path: '/', name: 'home', component: () => import('../views/MainView.vue') },
//     { path: '/signup', name: 'signup', component: () => import('../views/SignUp.vue') },
//     { path: '/student-area', name: 'StudentArea', component: () => import('../views/StudentArea.vue') },
//     { path: '/login', name: 'auth', component: () => import('../views/LoginView.vue') },
//     { path: '/booking', name: 'Booking', component: () => import('../views/LoginView.vue') },
//     { path: '/courses', name: 'CourseIntro', component: () => import('../views/MainView.vue') },
//   ]
// })
// export default router

import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SignUp from '../views/SignUp.vue'
import StudentArea from '../views/StudentArea.vue'
import Login from '../views/LoginView.vue'

// import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/student-area',
      name: 'StudentArea',
      component: StudentArea,
    },
    {
      path: '/login',
      name: 'auth',
      component: Login,
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Login,
    },
    {
      path: '/courses',
      name: 'CourseIntro',
      component: MainView,
    }
  ],
})

// // ✅ 使用全域導航守衛進行 Token 驗證
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.meta.requiresAuth && !authStore.token) {
//     alert('未授權，請先登入！')
//     next('/login') // 沒有 Token，導向登入頁面
//   } else {
//     next() // 有 Token，允許進入
//   }
// })

export default router

