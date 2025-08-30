<script lang="ts" setup>
import { h } from 'vue'
import { ElInput } from 'element-plus'
</script>

<template>
  <Component :is="h(ElInput, { ...$attrs }, $slots)"></Component>
</template>

<style scoped></style>
