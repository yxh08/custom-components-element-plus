<template>
  <div id="formBuilder">
    <el-dialog v-model="showForm"  v-bind="{...props.dialogProps}">
      <el-form :model="$props.formData" ref="form_ref" :rules="computedFormItemsRules">
        <el-row :gutter="10" style="width:100%;height:100%">
          <el-col v-for="item in  computedFormItems" :span="item.span || 24">
            <el-form-item  :label="item.label" :prop="item.prop">
              <component v-model="$props.formData[item.prop]" :is="findComponent(item)">
              </component>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button @click="submit" type="primary" :loading="submitLoading">提交</el-button>
      </template>
    </el-dialog>
  </div>

</template>
<script setup lang="ts">

import { type Component, ref, watch, computed, h, VNode ,useSlots ,useAttrs ,onUnmounted} from 'vue'
import { ElRadio, ElInput, ElSelect ,ElForm ,ElFormItem,ElCol,ElRow, ElDialog,ElButton} from 'element-plus'
import type{ FormBuilderOptions, FormItem } from '@/components/formBuilder/index'


const props:FormBuilderOptions & {_resolve:any,_reject:any} = useAttrs()


const formData = defineModel('formData', { type: Object })

const showForm= ref(true)


const computedFormItems = computed(() => {
  //filterItems 过滤隐藏
  return props.formItems.filter((x:FormItem)=>!x.hidden || !x.hasOwnProperty('hidden'))
  //format h() 处理type为h()的情况
})

const computedFormItemsRules = computed(() => {
  //filterItems 筛选出有rule的
  return Object.fromEntries(
    computedFormItems.value.filter(x=>x.rule).map(x=>[x.prop,x.rule])
  )
})



interface ComponentMap<V> {
  [key:string]: V;
}
const componentsMap:ComponentMap<any> =  {
  'input':ElInput,
  'radio': ElRadio,
  'select':ElSelect,
}

const findComponent = (item:any) =>{
  if(typeof item.type == 'string'){
    return h(componentsMap[item.type],{...item.props||{}},{...item.slots||{}})
  }else{
    // item.type == h() 的情况
    return item.type
  }
}

onUnmounted(()=>{
  console.log('onUnmounted')
})

const form_ref=ref(null)
const submitLoading= ref(false)

const cancel = ()=>{
  showForm.value = false
  props._reject('关闭')
}
const submit = () =>{

  console.log(computedFormItemsRules.value)
  submitLoading.value = true
   form_ref.value?.validate().then(res=>{
     console.log('表单校验结果',res)
     props._resolve(formData.value)
     setTimeout(()=>{
       showForm.value = false
     },1000)
   }).catch(err=>{
     props._reject(err)
   }).finally(_=>{
     setTimeout(()=>{
       submitLoading.value = false
     },1000)
   })
}

</script>
<style scoped></style>
