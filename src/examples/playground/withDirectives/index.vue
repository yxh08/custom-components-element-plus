<template>

  <comp></comp>

</template>

<script lang="ts" setup>

import { h, ref, withDirectives } from 'vue'


const test = {
  mounted(el) {
    console.log('el', el)
  },

}

const d = h(
  'div',
  {
    style: {
      color: 'red',
    },
  },
  'isShow?',
)

const isShowDiv = ref(true)


const comp = () => {
  return withDirectives(d, [[test, isShowDiv.value]])
}

</script>

<style scoped>

</style>