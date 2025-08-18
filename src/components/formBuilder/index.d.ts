import { type VNode, h  ,  createVNode  } from "vue"
export interface FormItem {
    prop: string,
    label: string,
    type: string | VNode,
    rule?:any ,
    span?: number | undefined,
    hidden?: boolean,
    slots?:any|{
        [key:string]: SlotsType
    }
}


interface replaceVNode extends VNode {
    key: string,
}

export interface FormBuilderOptions {
    formItems: FormItem[],
    formData: {},
    appendTo?: string | HTMLElement | null,
    dialogProps?:any,
}

// 优化：明确键值类型关联
interface ComponentMap<K extends string, V> {
    [key: K]: V;
}
