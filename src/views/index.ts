// `npm run deploy` For Github SPA
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/MainView.vue') },
    // { path: '/login', name: 'auth', component: () => import('@/views/LoginView.vue') },
  ]
})
export default router


// import { createRouter, createWebHistory } from 'vue-router'
// import MainVeiw from '../views/MainView.vue'
// import SignUp from '../views/SignUp.vue'
// // import { useAuthStore } from '@/stores/useAuthStore'
//
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: MainVeiw,
//     },
//     {
//       path: '/signup',
//       name: 'signup',
//       component: SignUp,
//     },
//   ],
// })
//
// // // ✅ 使用全域導航守衛進行 Token 驗證
// // router.beforeEach((to, from, next) => {
// //   const authStore = useAuthStore()
// //   if (to.meta.requiresAuth && !authStore.token) {
// //     alert('未授權，請先登入！')
// //     next('/login') // 沒有 Token，導向登入頁面
// //   } else {
// //     next() // 有 Token，允許進入
// //   }
// // })
//
// export default router
//
