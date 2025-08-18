<script lang="ts" setup>
import { h, provide, ref } from 'vue'
import child2 from './comp.vue'

const count = ref(0)
const increment = () => {
  count.value++
}

provide('count', count)

const child = {
  props: ['count'],
  setup(props) {
    console.log(props)
    return () => h(
      'div',
      { style: { border: '1px solid red' } },
      [
        h('div', 'child'),
        h('div', count.value),
      ])
  },
}

</script>

<template>
  <div style="width:100%;border:1px solid #000">
    <div @click="increment">parent</div>
    <div>{{ count }}</div>
    <child />
    <child2></child2>
  </div>

</template>

<style scoped>

</style>