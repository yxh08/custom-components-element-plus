<template>
  <el-button @click="openForm">打开表单</el-button>
</template>


<script setup lang="ts">
import formBuilder from '@/components/formBuilder/index.vue'
import { ref, h ,createApp,onMounted} from 'vue'
import { ElOption, ElSelect,ElMessageBox as $messageBox } from 'element-plus'
import useForm  from '@/components/formBuilder/useForm'


// 表单数据
const formData = ref<Record<string, any>>({})

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
    props:{
      onChange:(e)=>{
        console.log(e)}
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
      draggable:true,
      beforeClose:()=>{
        console.log('beforeClose')
      }
    }
  }).then(res=>{
    console.log('res', res)
  }).catch(err=>{
    console.log('err', err)
  })
}


</script>
<style scoped></style>