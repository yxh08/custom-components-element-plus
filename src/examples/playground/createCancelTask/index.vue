<template>
  <div>{{ count }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref<any>(0)

/**
 * @description 创建一个取消任务
 *  连续发送多个请求时,只取最后一次请求结果
 * @param data 模拟的请求结果
 * @param delay 模拟的请求延迟时间
 */

// 模拟的请求
async function request(data: number, delay = 2000): Promise<number> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}


//创建一个可以取消上一个请求的任务
const createCancelTask = (asyncTask: (...args: any) => Promise<any>) => {
  let cancel = () => {
  }
  return function(...args: any) {
    cancel()
    return new Promise(function promisefn(resolve, reject) {
      cancel = () => {
        resolve = reject = () => {
          console.log('cancel')
        }
      }

      /**
       * ❌then(resolve, reject),在then执行的时候已将置空前的执行的函数传过去,即使之后在cancel(),也无法改变then()里面的resolve,
       * ✅then(res => resolve(res), err => reject(err)),在函数执行时才会从上下文中查找resolve函数,此时的resolve已被改变
       */

      asyncTask(...args).then(res => resolve(res), err => reject(err)) // ✅
      // asyncTask(...args).then(resolve, reject) //❌
    })
  }
}


const fn = createCancelTask(request)

fn(1, 1500).then(res => {
  count.value = res

})

fn(2, 2500).then(res => {
  count.value = res
  console.dir(fn)
})


</script>
<style scoped>

</style>