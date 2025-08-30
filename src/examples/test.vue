<template></template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
function useCounter() {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { double, increment }
}

const { double, increment } = useCounter()
increment()
increment()
increment()
increment()
increment()
console.log(double.value)
</script>

<style>
.test {
  height: 50px;
  width: 50px;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
