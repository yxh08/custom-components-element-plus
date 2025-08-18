<template>

  <el-button @click="insert1">插入大量数据</el-button>
  <el-button @click="clear1">清理闭包函数</el-button>

 </template>

<script setup lang="ts">


function createArrayAppender(){
  const arr = []
  return function(num){
    arr.push(num)
  }
}

let appendToLargeArray = createArrayAppender()

const insert1 = () => {
  for(let i = 0;i<1e4;i++){
    appendToLargeArray(i)
  }
}

const clear1 = () =>{
  appendToLargeArray = null
}



</script>

<style></style>
