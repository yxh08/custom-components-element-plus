<template>
  <CusTable :ElTableProps="ElTableProps" :dict="dict" :tabledata="tabledata">
    <template #operate="{ row }">
      <el-table-column label="123" fixed="right"></el-table-column>
    </template>
  </CusTable>
</template>

<script setup>
import { ref, h } from 'vue'
import CusTable from '@/components/cus-table/index.vue'
import { dict_ } from './dict'
import { tabledata_ } from './tabledata'

const ElTableProps = {
  // 'max-height': 500,
  'header-row-class-name': 'header-row-test',
}

const dict = ref([
  {
    prop: 'index',
    label: '索引',
    ElTableColumnProps: {
      width: 200,
    },
  },
  {
    prop: 'content',
    label: '内容',
    formatter: () =>
      h('img', {
        src: 'https://picsum.photos/id/301/100/100',
        style: { display: 'block', width: '100px', height: '100px' },
      }),
    ElTableColumnProps: {
      'min-width': 500,
    },
  },
])
const tabledata = ref(tabledata_)
</script>

<style></style>
