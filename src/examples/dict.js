
import { h } from 'vue'
export const dict_ = [ 
    { field: 'class_id', class_id: '班级ID', show: false },
    {
      field: 'class_code',
      class_code: '班级代码',
      show: true,
      width: 180,
      sortable: 'custom',
    },
    {
      field: 'class_name',
      class_name: '班级名称',
      show: true,
      width: 300,
      showOverflowTooltip: true,
      sortable: 'custom',
    },
    { field: 'class_education', class_education: '班级专业', width: 180 },
    {
      field: 'class_plan_no',
      class_plan_no: '班级规划号',
      show: true,
      sortable: 'custom',
    },
    { field: 'class_stu_zj', class_stu_zj: '在籍人数', show: true, width: 100 },
    { field: 'class_stu_total', class_stu_total: '人数', show: true },
    { field: 'class_leader', class_leader: '班主任名称', show: true, width: 100 },
    { field: 'class_leader_uid', class_leader_uid: '班主任ID', show: false },
    {
      field: 'class_leader_second',
      class_leader_second: '副班主任名称',
      width: 100,
    },
    {
      field: 'class_leader_uid_second',
      class_leader_uid_second: '副班主任ID',
      show: false,
    },
    {
      field: 'class_classify_code',
      class_classify_code: '学生类别代码',
      sortable: 'custom',
    },
    { field: 'class_classify_name', class_classify_name: '学生类别名称' },
    {
      field: 'class_status',
      class_status: '班级状态',
      formatter: (a, b, c) => (c == 1 ? '正常' : '毕业'),
    },
    { field: 'class_stu_by', class_stu_by: '毕业人数' },
    {
      field: 'class_is_confirm',
      class_is_confirm: '是否确认',
      formatter: (a, b, c) => (c == 1 ? '是' : '否'),
    },
    { field: 'class_createtime', class_createtime: '创建时间', show: false },
    { field: 'class_updatetime', class_updatetime: '更新时间', show: false }
]