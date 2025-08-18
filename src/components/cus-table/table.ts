import type { TableColumnCtx, TableProps } from 'element-plus'
import { VNode } from 'vue'

export interface DictItem {
  /**
   * @params prop
   * @description 要显示的字段,接口对应字段
   *
   */
  prop: string

  /**
   * @params label
   * @description 字段名称
   *
   */
  label: string

  /**
   * @params ElTableColumnProps
   * @description 覆盖ElTableColumn的默认props
   *
   */
  ElTableColumnProps?: Partial<TableColumnCtx<any>>

  /**
   * @params formatter
   * @description 格式化某字段,或者按照VNode自定义渲染
   *
   */
  formatter?: (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => any,

  /**
   *
   * @param search
   * @description 查询字段 string | VNode | undefined
   *  1.element-plus 的组件名称(字符串:ElInput)
   *  2.()=>h(ElInput,{...},'xx')
   *  3.undefined 不设为查询字段
   * */
  search?: (() => VNode) | string,
  /**
   * @param show
   * @description 该字段是否显示 不写或者show:true 都为显示 , show:false 不显示
   */
  show?: boolean,

  children?: DictItem[]
}

export type Dict = DictItem[]

export type T = TableProps<T>
