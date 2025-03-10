Table 重封装组件说明
====


封装说明
----

>  基础的使用方式与 API 与 [官方版(Table)](https://vuecomponent.github.io/ant-design-vue/components/table-cn/) 本一致，在其基础上，封装了加载数据的方法。
>



内置方法
----

通过 `this.$refs.table` 调用

`this.$refs.table.onSearch()` 查询表格数据 在表格数据变化时需调用


内置属性
----
> 除去 `a-table` 自带属性外，还而外提供了一些额外属性属性  


| 属性           | 说明                                            | 类型              | 默认值 |
| -------------- | ----------------------------------------------- | ----------------- | ------ |
| search         | 查询参数 是否显示查询                             | [object] | null   |
| extraHeight    | 用于计算页面最佳高度                              | Number            |        |
| data           | 加载数据                                         | Array             | -      |
| pagination     | 自动加载分页数据                                  | Boolean           |        |
| scroll         | 表格scroll设置                                   | Object            |        |

例子
----
（基础使用）

```vue

<template>
  <b-table
    ref="table"
    bordered
    :columns="columns"
    :data="loadData"
    :loading="tableLoading"
    :pagination="true"
    :scroll="{x: 'auto'}"
    :search="{
      showHeader: true,
      searchParam: ['name'],
      localName: '批次名称'
    }"
    :extraHeight="300"
  >
    <template v-slot:name>
      <a-button type="primary" @click="addBatch">新增批次</a-button> 
    </template>
  </b-table>
</template>

<script>
  import BTable from '@/components/Table'

  export default {
    components: {
      BTable
    },
    data() {
      return {
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
            width: '30%'
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: '20%',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '30%',
            sorter: (a, b) => a.createTime - b.createTime,
            scopedSlots: { customRender: 'createTime' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        
        tableLoading: false,
        loadData: [],
        selectedRowKeys: []
      }
    },
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      // 注意 新增或删除数据 变化时调用 查询列表
      // this.$nextTick(() => {
      //   this.$refs.table.onSearch()
      // })
    }
  }
</script>

```