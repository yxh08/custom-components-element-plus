<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <el-form
      v-if="formItems.length"
      inline
      style="flex: 1; align-items: center"
    >
      <el-form-item
        v-for="item in formItems"
        :label="item.label"
        style="margin-top: 18px"
      >
        <Component
          :is="item.component"
          v-model="item.value"
          :placeholder="item.placeholder"
        ></Component>
      </el-form-item>
      <el-form-item style="margin-top: 18px">
        <el-button type="primary" @click="searchMethod_">
          <slot name="searchButtonName">查询</slot>
        </el-button>
      </el-form-item>
    </el-form>

    <div style="border: 1px solid var(--el-border-color)">
      <div
        style="
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
        "
      >
        <div>
          <slot name="operate"></slot>
        </div>
        <div>
          <el-popover placement="bottom-end" trigger="click">
            <template #reference>
              <el-button icon="filter"></el-button>
            </template>
            <div style="overflow: auto; height: 150px">
              <el-checkbox
                v-for="(item, index) in tableColumns"
                v-model="item.raw.show"
                :label="item.raw.label"
                @change="checkShowChange($event, index)"
              />
            </div>
          </el-popover>
        </div>
      </div>


      <el-table :data="tableData" v-bind="{ ...__ElTableProps__ }" v-on="{'header-dragend':headerDragend}">
        <!--    复选框    -->
        <el-table-column
          v-if="$attrs.onSelectionChange"
          :selectable="$attrs.selectable ?? (() => true)"
          type="selection"
          width="55"
        />

        <!--    遍历渲染tableColumn    -->
        <template v-for="columnItem in tableColumns">
          <Component
            :is="columnItem.component"
            v-if="columnItem.raw.show"
          ></Component>
        </template>


      </el-table>
    </div>

    <el-pagination
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pagesize"
      :page-count="pageInfo.total_page"
      :page-sizes="pageSizes"
      :total="pageInfo.total_count"
      layout="total, prev, pager, next,sizes"
      size="large"
      style="margin: 10px 0 0 auto"
      @size-change="searchMethod_({ pagesize: $event, page: pageInfo.page })"
      @current-change="
        searchMethod_({ page: $event, pagesize: pageInfo.pagesize })
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, h, onMounted, ref, useAttrs } from 'vue'
import type { TableProps } from 'element-plus'
import { ElTableColumn } from 'element-plus'
import type { Dict, DictItem } from '@/components/cus-table/table'
import { ColumnWidthMap } from './TableColumnWidthConfig'

/**
 * @variable __ElTableProps__
 * @description ElTable组件的props
 * 1.可以通过ElTableProps属性统一传递
 * 2.也可以直接在cus-table分散传递.
 * 3.都传以 ElTableProps 为主
 */
const $attrs = useAttrs()

console.log('$attrs', $attrs)

const __ElTableProps__ = computed(() => ({ ...$attrs, ...props.ElTableProps }))

/**
 * @variable
 * @description
 *
 */

const emits = defineEmits()

const tableData = ref([{}, {}, {}, {}])
const pageInfo = ref<any>({
  total: 0,
  page: 1,
  pagesize: 20,
  total_page: 0,
})
const pageSizes = [10, 20, 50, 100]
const searchMethod_ = async (info = { page: 1, pagesize: 20 }) => {
  const data = {
    ...Object.fromEntries(formItems.value.map((x: any) => [x.prop, x.value])),
    ...info,
  }
  // console.log(`output->data`, data)
  const res = await props.searchMethod(data)
  tableData.value = res.data['classlistlist']
  pageInfo.value = res.data
}


type TablePropsWithoutData<T> = Omit<TableProps<T>, 'data'>

const props = defineProps<TablePropsWithoutData<any> & {
  dict: Dict

  /**
   * @param searchMethod
   * @description 搜索和下载数据用的函数
   */
  searchMethod: (isDownload?: boolean) => any

  /**
   * @param ElTableProps
   * @description ElTable的属性
   */
  ElTableProps?: object

}>()

const formItems = ref<any>([])
const tableColumns = ref<any>([])


// ColumnWidthMap = {...TableColumnWidthConfig,...columnWidthMap}

// const  ColumnWidthMap  = {...TableColumnWidthConfig,...columnWidthMap}

onMounted(() => {
  tableColumns.value = props.dict?.map((x: DictItem) => ({
    component: h(
      ElTableColumn,
      {
        label: x.label,
        prop: x.prop,
        formatter: x.formatter,
        ...x.ElTableColumnProps,
        ...(ColumnWidthMap[x.label] ? { width: ColumnWidthMap[x.label] } : {}),
      },
      {
        default: () =>
          setElTableColumnChildren(
            x.children && x.children.length ? x.children : undefined,
          ),
      },
    ),
    raw: { ...x, show: !x.hasOwnProperty('show') || !!x.show },
  }))

  formItems.value = props.dict
    ?.filter((x: DictItem) => x.search)
    .map(x => ({
      component: typeof x.search == 'string' ? x.search : x.search!(), //是个vnode 或者为 element-plus 组件名称
      value: undefined,
      prop: x.prop,
      label: x.label,
      placeholder: x.label,
    }))

  // console.log('formItems', formItems.value)
  console.log('tableColumns', tableColumns.value)

  searchMethod_()
})

//table header的嵌套
const setElTableColumnChildren = children => {
  if (!children) return
  return children.map(x => {
    return h(
      ElTableColumn,
      {
        label: x.label,
        prop: x.prop,
        formatter: x.formatter,
        ...x.ElTableColumnProps,
        ...(ColumnWidthMap[x.label] ? { width: ColumnWidthMap[x.label] } : {}),
      },
      {
        default: () =>
          setElTableColumnChildren(
            x.children && x.children.length ? x.children : undefined,
          ),
      },
    )
  })
}


//显示隐藏表格字段
const checkShowChange = (val, index) => {
  tableColumns.value[index].raw.show = val
}

//table列宽度改变
const columnWidthMap: Record<string, number> = {}

const headerDragend = (newWidth, oldWidth, column) => {
  columnWidthMap[column.label] = newWidth
  console.log(columnWidthMap)
}

</script>

<style></style>
