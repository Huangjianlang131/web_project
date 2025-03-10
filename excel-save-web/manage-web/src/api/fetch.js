import axios from 'axios'
import route from '@/router'
import store from '@/store'
import qs from 'qs'
import notification from 'ant-design-vue/es/notification'
const key = `open${Date.now()}`
const Global = require('../../env/index.js')
const service = axios.create({
  baseURL: Global.base_url,
  timeout: 600000
})
service.interceptors.request.use(
  config => {
    // config.headers.token = sessionStorage.getItem('AUDITTOKEN')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    if (response.data.message === '请登录') {
      notification.error({
        message: '错误',
        description: '后台服务已重启，需重新登陆，请保存当前页面信息，再点击确定按钮',
        btn: h => {
          return h(
            'a-button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  notification.close(key)
                  store.dispatch('Logout')
                  route.replace({
                    path: '/login'
                  })
                }
              }
            },
            '确定'
          )
        },
        key,
        onClose: close
      })
    } else {
      return response
    }
  },
  error => {
    if (store.state.notify.onLineState) {
      if (
        error.response !== undefined &&
        (error.response.status === 500 || error.response.status === 503 || error.response.status === 404)
      ) {
        notification.error({
          key,
          message: '请求失败',
          description: '服务器异常，请稍后重试'
        })
      } else {
        notification.error({
          key,
          message: '请求超时',
          description: error.message
        })
      }
    } else {
      notification.error({
        key,
        message: '网络未连接',
        description: '请确认你的网络是否出现异常',
        duration: 0,
        // icon: '< a - icon type = "global" / >'
        icon: "close-circle" 
      })
      // 返回登录页面
      store.dispatch('Logout')
      route.replace({
        path: '/login'
      })
    }
    return Promise.reject(error)
  }
)
async function fetch(url, data, methods = 'post') {
  let res = null
  if (methods === 'get') {
    res = await service.get(url, data)
  } else {
    res = await service.post(url, data)
  }
  return res
  // todo: 统一业务处理
}


//普通表单post请求
const post = (url, data, config) => {
  return service.post(url, qs.stringify(data), config);
}

//json主体post请求
const postJSON = (url, data, config) => {
  return service.post(url, data, config);
}

//put请求
const put = (url, data, config) => {
  return service.put(url, data, config);
}
//get请求
const get = (url, params, config) => {
  return service.get(url, {
    params
  }, config);
}
//删除请求
const del = (url, config) => {
  return service.delete(url, config);
}

export {
  post,
  postJSON,
  put,
  get,
  del
}

export default service

export {
  fetch,
  service
}
