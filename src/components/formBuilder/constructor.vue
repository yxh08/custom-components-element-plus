<template>
  <div id="formBuilder">
    <el-dialog ref="dialog_ref" v-model="showForm" v-bind="{...props.dialogProps}">
      <el-form ref="form_ref" :model="_formData" :rules="computedFormItemsRules">
        <el-row :gutter="10" style="width:100%;height:100%">
          <el-col v-for="item in  computedFormItems" :span="item.span || 24">
            <el-form-item :label="item.label" :prop="item.prop">
              <component :is="findComponent(item)" v-model="_formData[item.prop]">
              </component>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button :loading="submitLoading" type="primary" @click="submit">提交</el-button>
      </template>
    </el-dialog>
  </div>

</template>
<script lang="ts" setup>

import { type Component, computed, h, onUnmounted, ref, useAttrs } from 'vue'
import { ElButton, ElCol, ElDialog, ElForm, ElFormItem, ElInput, ElRadio, ElRow, ElSelect } from 'element-plus'
import type { FormBuilderOptions, FormItem } from '@/components/formBuilder/index'

const props: FormBuilderOptions & { _resolve: any, _reject: any } = useAttrs()

console.log('props', props)


const _formData = ref({
  ...props.formData || {},
})

const showForm = ref(true)

const computedFormItems = computed(() => {
  //filterItems 过滤隐藏
  return props.formItems.filter((x: FormItem) => !x.hidden || !x.hasOwnProperty('hidden'))
  //format h() 处理type为h()的情况
})

const computedFormItemsRules = computed(() => {
  //filterItems 筛选出有rule的
  return Object.fromEntries(
    computedFormItems.value.filter(x => x.rule).map(x => [x.prop, x.rule]),
  )
})


interface ComponentMap<V> {
  [key: string]: V;
}

const componentsMap: ComponentMap<any> = {
  'input': ElInput,
  'radio': ElRadio,
  'select': ElSelect,
}

const findComponent = (item: any) => {
  if (typeof item.type == 'string') {
    return h(componentsMap[item.type], { ...item.props || {} }, { ...item.slots || {} })
  } else {
    // item.type == h() 的情况
    return item.type
  }
}

onUnmounted(() => {
  console.log('onUnmounted')
})

const dialog_ref = ref(null)
const form_ref = ref(null)
const submitLoading = ref(false)
const switchSubmitLoading = (val: boolean) => {
  submitLoading.value = val
}


const cancel = () => {
  showForm.value = false
  props._reject('关闭')
}
const submit = () => {
  submitLoading.value = true
  form_ref.value?.validate().then(res => {
    // console.log('表单校验结果',res)
    props._resolve({
      data: _formData.value,
      form_ref: form_ref.value,
      dialog_ref: dialog_ref.value,
      switchSubmitLoading,
    })
    // setTimeout(()=>{
    //   showForm.value = false
    // },1000)
  }).catch(err => {
    props._reject(err)
    submitLoading.value = false
  }).finally(_ => {
  })
}

</script>
<style scoped></style>
