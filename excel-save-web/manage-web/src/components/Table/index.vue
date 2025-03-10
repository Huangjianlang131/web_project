<script>
import T from 'ant-design-vue/es/table/Table'
import { getPageHeight } from '@/utils/util'

export default {
  name: 'BTable',
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    size: {
      type: String,
      default: 'default'
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    rowSelection: {
      type: Object,
      default: null
    },
    search: {
      type: Object,
      default: () => {
        return {
          showHeader: false,
          searchParam: [],
          localName: '名称'
        }
      }
    },
    extraHeight: {
      type: Number,
      default: 120 + 48 // 页面只有表格时
    }
  }),
  data () {
    return {
      selectedRows: [],
      selectedRowKeys: [],

      // 用于查询的参数设置
      searchValue: '',
      tableData: JSON.parse(JSON.stringify(this.data)),
      bakData: JSON.parse(JSON.stringify(this.data)),

      // 用于设置表格分页
      localPagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: function (total) {
          return `共 ${total} 条`
        },
        pageSize: 10,
        showSizeChanger: true,
      },
      tableHeight: 0
    }
  },
  computed: {
    localColumns () {
      return this.columns.map(item => {
        if(!item.hasOwnProperty('align')) {
          item.align = 'center'
        }
        if (!item.scopedSlots) {
          item.ellipsis = true
        }
        return item
      })
    },
    localScroll () {
      const width = this.columns.reduce((acc, next) => acc + next.width, 0)
      if (typeof width !== 'number') {
        return {
          y: this.tableHeight, scrollToFirstRowOnChange: true
        }
      } else {
        return {
          x: width, y: this.tableHeight, scrollToFirstRowOnChange: true
        }
      }
    }
  },
  mounted () {
    // 计算最隹的table条数
    this.tableHeight = getPageHeight() - this.extraHeight
    //const bestSize = parseInt(this.tableHeight / 54)
    this.localPagination.pageSize = 10
    /*
    const index = this.localPagination.pageSizeOptions.findIndex(item => Number(item) > bestSize)
    if (Number(this.localPagination.pageSizeOptions[index - 1]) !== bestSize) {
      this.localPagination.pageSizeOptions.splice(index, 0, bestSize + '')
    }
    */
  },

  methods: {
    // render 搜索框和按钮
    renderHeader () {
      // render
      return (
        <div class="header-button">
          <a-input-search
            style="width: 320px"
            placeholder={`${this.search.localName}搜索`}
            onSearch={(value) => {
              this.onSearch(value)
            }}
            v-model={this.searchValue}
            enterButton
          />
          {this.$slots.name}
        </div>
      )
    },
    /**
     * 用于更新已选中的列表数据
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * 用于查询列表数据
     * @param value
     * @param params
     */
    onSearch (value = this.searchValue, params = this.search.searchParam) {
      if (value !== '') {
        this.tableData = this.bakData.filter(item => {
          let exist = false
          // 根据传入的参数 判断值是否存在
          params.forEach(pa => {
            if (item[pa] && item[pa].toLocaleUpperCase().includes(value.trim().toLocaleUpperCase())) exist = true
          })
          if (exist) return item
        })
      } else {
        this.tableData = JSON.parse(JSON.stringify(this.bakData))
      }
    }
  },

  watch: {
    searchValue (val) {
      if (val === '') this.onSearch('')
    },
    data (val) {
      if (val && val.length > 0) {
        this.tableData = JSON.parse(JSON.stringify(val))
        this.bakData = JSON.parse(JSON.stringify(val))
      } else {
        this.tableData = this.bakData = []
      }
    }
  },

  render () {
    const { search: { showHeader }, pagination, scroll, localColumns, localPagination, localScroll } = this
    const props = {}

    Object.keys(T.props).forEach(k => {
      if (k === 'rowSelection') {
        if (showHeader && this.rowSelection) {
          props[k] = {
            ...this.rowSelection,
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows)
              typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows)
            }
          }
          return props[k]
        } else if (!this.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null
          return props[k]
        }
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })

    props.columns = localColumns

    // pagination不为false时 使用计算好的pagination
    if (pagination) {
      props.pagination = localPagination
    } else {
      props.pagination = false
    }
    // 自动设置表格scroll
    if (scroll.x === 'auto') {
      props.scroll = localScroll
    }
    // dataSource赋值
    props.dataSource = this.tableData

    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }}>
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    )

    return (
      <div class="table-wrapper">
        { showHeader ? this.renderHeader() : null }
        { table }
      </div>
    )
  }
}

</script>
<style scoped>
.header-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

/* ::v-deep .ant-table tr:nth-child(even) {
  background: #f4f4f4;
} */
</style>
