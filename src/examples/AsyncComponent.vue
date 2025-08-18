<script setup lang="ts">
import { h ,render  } from 'vue'
import {defineAsyncComponent } from '@/components/async-component/index.ts'

//https://cdn.jsdelivr.net/npm/element-plus@2.10.4/es/components/affix/index.mjs
// loader: () => import('../components/async-component/loader.vue'),

// let comp = {
//   setup(){
//     return ()=>h("div",'加载中...')
//   }
// }

const comp = defineAsyncComponent({
  loader: ()=>import('../../node_modules/element-plus/es/components/button/index.mjs'),
  // loader: ()=>import('../components/async-component/loader.vue'),
  loadingComponent:() =>h('div','加载中.....'),
  errorComponent: () =>h('div','加载失败'),
  timeout:5000
})

const click = ()=>{
  console.log(111)
}

console.log('import.meta.url', import.meta.url)

</script>

<template>
  <comp @click="click">
    <template #icon>
      <div>icon</div>
    </template>

    <template #default>
      <div>按钮</div>
    </template>
  </comp>
</template>

<style scoped>

</style>