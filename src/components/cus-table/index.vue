<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <el-form
      inline
      style="flex: 1; align-items: center"
      v-if="formItems.length"
    >
      <el-form-item
        :label="item.label"
        v-for="item in formItems"
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
                :label="item.raw.label"
                v-model="item.raw.show"
                @change="checkShowChange($event, index)"
                v-for="(item, index) in tableColumns"
              />
            </div>
          </el-popover>
        </div>
      </div>


      <el-table v-bind="{ ...__ElTableProps__ }" :data="tableData">
        <!--    复选框    -->
        <el-table-column
          v-if="$attrs.onSelectionChange"
          type="selection"
          :selectable="$attrs.selectable ?? (() => true)"
          width="55"
        />

        <!--    遍历渲染tableColumn    -->
        <template v-for="columnItem in tableColumns">
          <Component
            v-if="columnItem.raw.show"
            :is="columnItem.component"
          ></Component>
        </template>


      </el-table>
    </div>

    <el-pagination
      style="margin: 10px 0 0 auto"
      size="large"
      :total="pageInfo.total_count"
      :page-count="pageInfo.total_page"
      :page-sizes="pageSizes"
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pagesize"
      layout="total, prev, pager, next,sizes"
      @size-change="searchMethod_({ pagesize: $event, page: pageInfo.page })"
      @current-change="
        searchMethod_({ page: $event, pagesize: pageInfo.pagesize })
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, computed, useAttrs, defineComponent } from 'vue'
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

const tableData = ref([])
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

const props = defineProps<{
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

const checkShowChange = (val, index) => {
  tableColumns.value[index].raw.show = val
}
</script>

<style></style>
