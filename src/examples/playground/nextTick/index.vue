<template>

  <div id="container">
    {{ count }}
  </div>

  <button @click="change"> change</button>

</template>

<script lang="ts" setup>

import { nextTick, ref } from 'vue'

const count = ref(0)

const change = async () => {
  count.value++
  console.log('container.innerText before', container.innerText)
  await nextTick()
  console.log('container.innerText after', container.innerText)
  alert('stop')
}


</script>

<style scoped>

</style>