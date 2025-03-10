import Vue from 'vue'
import {
    Pagination,
    Timeline,
    Tree,
    Calendar,
    Alert,
    Empty,
    Statistic,
    Popover,
    Descriptions,
    Cascader,
    Badge,
    FormModel,
    Transfer,
    Switch,
    Select,
    Drawer,
    Dropdown,
    Tag,
    Steps,
    Radio,
    InputNumber,
    Checkbox,
    Divider,
    Popconfirm,
    Spin,
    Collapse,
    List,
    Form,
    Input,
    Tooltip,
    Layout,
    Row,
    Tabs,
    Col,
    Card,
    Modal,
    Menu,
    Button,
    Icon,
    Avatar,
    Table,
    DatePicker,
    TimePicker,
    ConfigProvider,
    notification,
    message,
    Upload,
    Progress,
    Breadcrumb,
    Carousel,
    TreeSelect,
    Space,
    Skeleton
} from 'ant-design-vue'

Vue.use(Pagination)
Vue.use(Tree)
Vue.use(Calendar)
Vue.use(Alert)
Vue.use(Empty)
Vue.use(Statistic)
Vue.use(Descriptions)
Vue.use(Cascader)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(FormModel)
Vue.use(Transfer)
Vue.use(Switch)
Vue.use(Form)
Vue.use(Dropdown)
Vue.use(Drawer)
Vue.use(Input)
Vue.use(Steps)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(InputNumber)
Vue.use(Tag)
Vue.use(Spin)
Vue.use(Divider)
Vue.use(Popconfirm)
Vue.use(Collapse)
Vue.use(List)
Vue.use(Select)
Vue.use(Tooltip)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Button)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Tabs)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Avatar)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(ConfigProvider)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(Progress)
Vue.use(Breadcrumb)
Vue.use(Carousel)
Vue.use(TreeSelect)
Vue.use(Space)
Vue.use(Skeleton)
Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
message.config({
  duration: 3,
  maxCount: 1
})
