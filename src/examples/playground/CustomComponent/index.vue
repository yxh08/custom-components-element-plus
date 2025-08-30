<script lang="ts" setup>
import { ref } from 'vue'
import Child from './comp.vue'

const fn = val => {
  text.value = val
}
const text = ref('13123')
</script>

<template>
  <div>
    <!--    <el-input @blur="fn"></el-input>-->
    <Child v-model="text" clearable></Child>
  </div>
</template>

<style scoped></style>
