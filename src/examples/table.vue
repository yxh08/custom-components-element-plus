<template>
  <CusTable
    :ElTableProps="ElTableProps"
    :dict="dict"
    :maxHeight="200"
    :searchMethod="$.list"
    @selectable="handleSelectionChangeSelectable"
    @selection-change="handleSelectionChange"
  >
    <template #operate>
      <el-button type="primary">新增</el-button>
      <el-button type="danger">删除</el-button>
    </template>
  </CusTable>

</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import CusTable from '@/components/cus-table/index.vue'
import { ElButton, ElInput } from 'element-plus'
import type { DictItem } from '@/components/cus-table/table'
import $ from '@/api/index'

const handleSelectionChange = val => {
  console.log(`output->selectedList`, val)
}

const handleSelectionChangeSelectable = row => {
  // if (row.class_leader == '朱奕佳') {
  //   return false
  // }
  return true
}

const ElTableProps: any = {
  'max-height': 600,
  'header-row-class-name': 'header-row-test',
  border: true,
  style: {
    // height: '500px',
    //...
  },
}

const dict = ref<DictItem[]>([
  {
    prop: 'class_id',
    label: '班级ID',
    search: () => h(ElInput, {}),
    show: false,
  },
  {
    prop: '',
    label: '班级信息',
    ElTableColumnProps: {
      align: 'center',
    },
    children: [
      {
        prop: 'class_code',
        label: '班级代码',
        search: 'ElInput',
        ElTableColumnProps: {
          minWidth: 100,
        },
      },
      {
        prop: 'class_name',
        label: '班级名称',
        search: 'ElInput',
      },
    ],
  },

  {
    prop: 'class_education',
    label: '班级专业',
  },
  {
    prop: 'class_plan_no',
    label: '班级规划号',
  },
  {
    prop: 'class_stu_zj',
    label: '在籍人数',
  },
  {
    prop: 'class_stu_total',
    label: '人数',
  },
  {
    prop: 'class_leader',
    label: '班主任名称',
  },
  {
    prop: 'class_leader_uid',
    label: '班主任ID',
  },
  {
    prop: 'class_leader_second',
    label: '副班主任名称',
  },
  {
    prop: 'class_leader_uid_second',
    label: '副班主任ID',
  },

  {
    prop: 'class_classify_code',
    label: '学生类别代码',
  },
  {
    prop: 'class_classify_name',
    label: '学生类别名称',
  },
  {
    prop: 'class_status',
    label: '班级状态',
    formatter: (a, b, c) => (c == 1 ? '正常' : '毕业'),
  },
  {
    prop: 'class_stu_by',
    label: '毕业人数',
  },
  {
    prop: 'class_is_confirm',
    label: '是否确认',
    formatter: (a, b, c) => (c == 1 ? '是' : '否'),
  },
  {
    prop: 'class_createtime',
    label: '创建时间',
  },
  {
    prop: 'class_updatetime',
    label: '更新时间',
  },
  // {
  //   prop: '',
  //   label: '操作',
  //   formatter: row =>
  //     h(
  //       ElButton,
  //       {
  //         onClick: () => {
  //           console.log(`output->row`, row)
  //         },
  //         type: 'primary',
  //       },
  //       () => '编辑',
  //     ),
  //   ElTableColumnProps: {
  //     fixed: 'right',
  //     width: 100,
  //   },
  // },
])
</script>

<style></style>
