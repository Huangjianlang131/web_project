import axios from 'axios'
import { message } from 'ant-design-vue'
const Global = require('../../env/index.js')

message.config({
    duration: 1, // 持续时间
    top: `30px`, // 到页面顶部距离
    maxCount: 5 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});
import 'ant-design-vue/dist/antd.css'
const request = axios.create({
    baseURL: Global.base_url
})
request.interceptors.request.use(
    config => {
        // config.headers.token = sessionStorage.getItem('AUDITTOKEN')
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
request.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log('error---response----data-------------', error.response.data)
        return Promise.reject(error)
    }
)
async function fetch(url, data, methods = 'post') {
    let res = null
    if (methods === 'get') {
        res = await request.get(url, data || {})
    } else {
        res = await request.post(url, data || {})
    }
    return res
        // todo: 统一业务处理
}

export {
    fetch,
    request
}