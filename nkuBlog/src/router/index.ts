import { createRouter, createWebHistory } from 'vue-router'
import { routerStatus } from '@/stores/routerStatus'
import { userStatus } from '@/stores/userStatus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/IndexView.vue')
    },
    {
      path: '/changeInfo',
      name: 'change',
      component: () => import('@/views/ChangeInfo.vue')
    },
    {
      path: '/postArticle',
      name: 'post',
      component: () => import('@/views/PostArticle.vue')
    },
    {
      path: '/:user',
      name: 'user',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = userStatus()
        let user: string = to.params.user
        
        userStore.currentUser = user
        next()
      }
    },
    {
      path: '/:user/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const routerStore: any = routerStatus()
        routerStore.isRoute()
        setTimeout(() => {
          next()
        }, 900)
      }
    },

    {
      path: '/:user/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      beforeEnter: (to, from, next) => {
        const routerStore = routerStatus()

        routerStore.isRoute()

        setTimeout(() => {
          next()
        }, 900)
      }
    },
    {
      path: '/:user/blog',
      name: 'blog',
      component: () => import('@/views/BlogView.vue'),
      beforeEnter: (to, from, next) => {
        const routerStore = routerStatus()

        routerStore.isRoute()

        setTimeout(() => {
          next()
        }, 900)
      }
    },

    {
      path: '/login',
      name: 'userlogin',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
