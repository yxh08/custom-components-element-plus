<template>

  <div style="margin: 0 auto;width: fit-content">
    <div style="display:flex;gap:10px;">
      <span v-for="item in list2">{{ item }}</span>
    </div>
    <div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list1 = ref([10, 3, 5, 9, 12, 8, 15, 18])
const list2 = ref([10, 3, 5, 11, 12, 6, 7, 8, 9])

</script>

<style scoped>

</style>