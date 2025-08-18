import formBuilder  from '@/components/formBuilder/constructor.vue'
import { ref, h ,createApp,onMounted, render} from 'vue'
import type { FormBuilderOptions } from '@/components/formBuilder/index'

const defaultDialogProps = {
   draggable: true,
}

//存放dialog dom
const formContainerMap = new WeakMap()

export default function useForm (options:FormBuilderOptions){
   let appendTo
   if(typeof  options.appendTo == 'string'){
     appendTo = document.querySelector(options.appendTo)
   }else{
     appendTo = options.appendTo
   }

   if (!appendTo){
     appendTo = document.body
   }
   return new Promise((_resolve,_reject)=>{
     const container  = genContainer(options)
     const VNode  = h(
       formBuilder,
       {
         formItems:options.formItems,
         formData:options.formData,
         dialogProps:{
           'onClosed'(){
             const targetDom = formContainerMap.get(options)
             targetDom && appendTo.removeChild(targetDom)
           },
           ...defaultDialogProps,
           ...options.dialogProps,

         },
         _resolve,
         _reject
       })
     render(VNode,container)
     formContainerMap.set(options,container.firstElementChild)
     appendTo.appendChild(container.firstElementChild!)
   })
}



const genContainer = (options:FormBuilderOptions)=>{
  return  document.createElement('div')
}
