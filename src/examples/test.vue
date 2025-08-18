<template>

  <div class="test">测试测试测试测试测试测一二三四</div>
</template>

<script lang="ts" setup>


// //debounce
// function debounce(fn, delay = 5000){
//   let timer
//   return function(...args){
//     timer && clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, delay)
//   }
// }


// async function foo(){
//   console.log(1)
//  Promise.reject(2)
// }
// foo().catch(err=>{
//   console.log('err', err)
// })


</script>

<style>

.test {
  height: 50px;
  width: 50px;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
