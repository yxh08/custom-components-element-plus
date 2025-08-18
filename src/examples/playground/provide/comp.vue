<script lang="ts" setup>
import { inject } from 'vue'

const count = inject('count')


</script>

<template>
  <div>child2</div>
  <div>{{ count }}</div>
</template>

<style scoped>

</style>