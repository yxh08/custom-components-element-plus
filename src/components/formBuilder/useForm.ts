import formBuilder  from '@/components/formBuilder/index.vue'
import { ref, h ,createApp,onMounted, render} from 'vue'
import type { FormBuilderOptions } from '@/components/formBuilder/index'
const formBuilderInstance  = createApp(formBuilder)


const defaultDialogProps = {
   draggable: true,
}

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
     const container  = genContainer()
     const VNode  = h(
       formBuilder,
       {
         formItems:options.formItems,
         formData:options.formData,
         dialogProps:{
           ...defaultDialogProps,
           ...options.dialogProps
         },
         _resolve,
         _reject
       })
     render(VNode,container)
     appendTo.appendChild(container.firstElementChild!)
   })
}

const genContainer = ()=>{
  return document.createElement('div')
}
