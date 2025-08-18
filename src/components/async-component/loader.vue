<template>
  <div>
    .vue组件
    <div style="display:flex">
      <span>slot:icon-</span>
      <slot name="icon"></slot>
    </div>
    <div style="display:flex">
      <span>slot:default-</span>
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>