import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: defineAsyncComponent(() => import('@/App.vue')),
    redirect: '/index',
    children: [] // 可选，显式声明空数组避免类型错误
  },
  {
    path: '/index',
    component: defineAsyncComponent(() => import('@/examples/index.vue'))
  },
  {
    path: '/table',
    component:() => import('@/examples/table.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router