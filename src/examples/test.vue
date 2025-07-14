<template>
  <div>
    <comp></comp>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { ElButton, ElInput } from 'element-plus'

const comp = h('div', 'hell world')
</script>

<style></style>
