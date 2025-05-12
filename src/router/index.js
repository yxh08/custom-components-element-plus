import { dropdownItemProps } from 'element-plus'
import { createWebHashHistory, createRouter } from 'vue-router'



const routes = [
  { path: '/', component: ()=>import('@/App.vue'),redirect:'/index' },
  { path: '/index', component: ()=>import('@/examples/index.vue') },
  { path: '/table', component: ()=>import('@/examples/table.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router