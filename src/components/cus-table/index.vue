<template>
  <el-table
    v-bind="{ ...ElTableProps }"
    :data="[{ index: 1, content: '内容' }]"
  >
    <template v-for="columnItem in tableColumns">
      <Component :is="columnItem"></Component>
    </template>

    <slot name="operate"></slot>
  </el-table>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { ElTableColumn } from 'element-plus'
const props = defineProps({
  dict: {
    type: Array,
  },
  tableData: {
    type: Array,
  },
  ElTableProps: {
    type: Object,
  },
})

// const generateColumns = dict => {
//   console.log(dict)
// }

const tableColumns = ref([])

onMounted(() => {
  console.log(`output->props.dict`, props.dict)
  tableColumns.value = props.dict.map(x =>
    h(ElTableColumn, {
      label: x.label,
      prop: x.prop,
      formatter: x.formatter,
      ...x.ElTableColumnProps,
    }),
  )
  console.log('tableColumns', tableColumns.value)
})
</script>

<style></style>
