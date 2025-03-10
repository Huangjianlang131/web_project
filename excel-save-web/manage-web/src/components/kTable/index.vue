<script>
import T from "ant-design-vue/es/table/Table"
import { fetch } from '@/api'
export default {
    name: 'kTbale',
    props: Object.assign({}, T.props, {
        requestUrl: {
            type: String,
            default: () => {
                return ''
            }
        },
        columns: {
            type: Array,
            default: () => {
                return []
            }
        },
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        scroll: {
            type: Object,
            default: () => {
                return {}
            }
        },
        pagination: {
            type: Object | Boolean,
            default: () => {
                return {}
            }
        },
        searchData: {
            type: Object,
            default: () => {
                return {}
            }
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
        needLoading: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    }),
    data () {
        return {
            localPagination: {
                current: 1,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                showTotal: function (total) {
                    return `共 ${total} 条`
                },
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true
            },
            localDataSource: [],
            localLoading: false,
            tableData: [],
            bakData: [],
            // 用于查询的参数设置
            searchValue: '',
        }
    },
    created () {
        const columns = this.columns.map(item => {
            if(!item.hasOwnProperty('align')) {
                item.align = 'center'
            }
            if (!item.scopedSlots) {
                item.ellipsis = true
            }
            return item
        })
        this.$emit('update:columns', columns)
    },
    mounted () {
        if (this.requestUrl) {
            this.loadData()
        } else {
            this.tableData = JSON.parse(JSON.stringify(this.data))
            this.bakData = JSON.parse(JSON.stringify(this.data))
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
    methods: {
        /**
         * render 搜索框和按钮
         */
        renderHeader () {
            // render
            return (
                <div class="header-button">
                    <a-input-search
                        style="width: 210px"
                        placeholder={`${this.search.localName}搜索`}
                        onSearch={(value) => {
                            this.onSearch(value)
                        }}
                        v-model={this.searchValue}
                        enterButton
                    />
                    {this.$slots.name}
                    {this.$slots.test}
                </div>
            )
        },
        change (value) {
            this.$emit('change', value)
            console.log(value)
            const props = {}
            Object.keys(T.props).forEach(k => {
                this[k] && (props[k] = this[k])
                return props[k]
            })
            const {
                localPagination
            } = this
            if (!(typeof (this.pagination) === 'boolean')) {
                this.searchData.pageIndex = value.current
                this.searchData.pageSize = value.pageSize
                this.localPagination = Object.assign({}, value)
                console.log(this.localPagination)
                this.loadData()
            } else {
                if (this.pagination) {
                    props.pagination = localPagination
                    console.log(props.pagination)
                    props.pagination.onChange = ((page, pageSize) => {
                        props.pagination.current = page
                    })
                    // delete props.pagination
                } else {
                    props.pagination = false
                }
            }
        },

        /**
         * 表格重新加载方法
         * 如果参数为 true, 则强制刷新到第一页
         * @param Boolean bool
         */
        refresh (bool = false, filters) {
            bool ? this.searchData.pageIndex = 1 : ''
            this.loadData()
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
                    console.log(item)
                    console.log(value)
                    params.forEach(pa => {
                        console.log(pa)
                        if (item[pa] && item[pa].toLocaleUpperCase().includes(value.trim().toLocaleUpperCase())) exist = true
                    })
                    if (exist) return item
                })
            } else {
                this.tableData = JSON.parse(JSON.stringify(this.bakData))
            }
        },
        /**
         * 加载数据方法
         * @param {Object} pagination 分页选项器
         * @param {Object} filters 过滤条件
         * @param {Object} sorter 排序条件
         */
        loadData (pagination, filters) {
            this.needLoading ? this.localLoading = true : this.localLoading = false
            console.log(this.searchData)
            fetch(this.requestUrl, this.searchData)
                .then((res) => {
                    this.localLoading = false
                    const r = res.data.responseBody || {}
                    const data = r.data
                    this.localPagination = Object.assign({}, this.localPagination, {
                        current: r.pageIndex ? r.pageIndex : r.currPage + 1, // 返回结果中的当前分页数
                        total: r.total, // 返回结果中的总记录数
                        pageSize: r.pageSize
                    })
                    console.log(res)
                    console.log(this.localPagination)
                    // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
                    if (data.length === 0 && this.localPagination.current > 1) {
                        this.localPagination.current--
                        this.loadData()
                        return
                    }
                    this.localDataSource = data // 返回结果中的数组数据
                })
                .finally(() => {
                    this.localLoading = false
                })
        },
    },
    render () {
        const {
            search: { showHeader },
            requestUrl,
            columns,
            pagination,
            localPagination
        } = this
        const props = {}

        Object.keys(T.props).forEach(k => {
            this[k] && (props[k] = this[k])
            return props[k]
        })
        // localPagination.total = this.pagination.total
        props.columns = columns
        if (pagination && requestUrl) {
            props.pagination = Object.assign({}, pagination, localPagination)
            // props.pagination.onChange = ((page,pageSize) => {
            //   props.pagination.current = page
            // })
            props.loading = this.localLoading
        } else {
            if (pagination) {
                props.pagination = localPagination
                props.pagination.onChange = ((page, pageSize) => {
                    props.pagination.current = page
                    props.pagination.pageSize = pageSize
                })
                // delete props.pagination
            } else {
                props.pagination = false
            }
        }
        this.requestUrl ? props.dataSource = this.localDataSource : props.dataSource = this.tableData
        const table = (
            <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.change}>
                {Object.keys(this.$slots).map(name => (
                    <template slot={name}>{this.$slots[name]}</template>
                ))}
            </a-table>
        )

        return (
            <div class="table-wrapper">
                {showHeader ? this.renderHeader() : null}
                {table}
            </div>
        )
    }
}
</script>
<style scoped>
.header-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
}

::v-deep .ant-table tr:nth-child(even) {
  background: #f4f4f4;
}
</style>
