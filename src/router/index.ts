import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component:() => import('@/App.vue'),
    redirect: '/index',
    children: [], // 可选，显式声明空数组避免类型错误
  },
  {
    path: '/index',
    component: () => import('@/examples/index.vue'),
  },
  {
    path: '/table',
    component: () => import('@/examples/table.vue'),
  },
  {
    path: '/form',
    component: () => import('@/examples/form.vue'),
  },
  {
    path: '/test',
    component: () => import('@/examples/test.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
