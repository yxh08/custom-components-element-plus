<template>
  <el-button @click="openForm">打开表单</el-button>
</template>


<script setup lang="ts">
import { ref, h ,watch} from 'vue'
import { ElOption, ElSelect,ElMessage as $message } from 'element-plus'
import useForm  from '@/components/formBuilder/useForm'


// 表单数据
const formData = ref<Record<string, any>>({
  username:'test',
  age:18,
})

watch(()=>formData,(val)=>{
  console.log(val.username)
})

const formItems = [
  {
    label: '姓名',
    prop: 'username',
    type: 'input',
    rule: [{ required: true, message: 'required', trigger: 'blur' }],
    span:12,
    slots:{
      prepend:()=>h('div','test')
    },
    props: {
      onChange: () => {}
    }
  },
  {
    label: '年龄',
    prop: 'age',
    type: 'input',
    span:12
  },
  {
    label: '性别',
    prop: 'gender',
    type: h(ElSelect,{},()=>[
      h(ElOption, {label:'男',value:1}),
      h(ElOption, {label:'女',value:0}),
      h(ElOption, {label:'未知',value:2}),
    ]),
  },
]

function openForm (){
  useForm({
    formItems:formItems,
    formData:formData.value,
    dialogProps:{
      title:'表单',
      width:'500px',
      draggable:true,
    }
  }).then(res=>{
    console.log('res', res)
    setTimeout(()=>{
      res.switchSubmitLoading(false)
      // res.dialog_ref.handleClose ()
    },2000)
    // $message.success()
  }).catch(err=>{
    console.log('err', err)
  })
}


</script>
<style scoped>


</style>