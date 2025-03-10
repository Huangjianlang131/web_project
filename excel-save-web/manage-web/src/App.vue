<template>
  <a-config-provider :locale="zhCN" >
    <div id="app" style="height: 100%;width: 100%;">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
<script>
import { fetch, urls } from '@/api'
import bcrypt from 'bcryptjs'
import md5 from "md5"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import { mapMutations } from 'vuex'
import moment from 'moment'
import 'moment/locale/zh-cn'
const key = `open${Date.now()}`
moment.locale('zh-cn')

export default {
  name: 'App',
  data() {
    return {
      zhCN,
      onLine: navigator.onLine,
    }
  },
  mounted() {
    // 登录
    // const loginParams = { userName: 'admin', password: md5('1') }
    // this.Login(loginParams)
  },
  beforeDestroy() {
  },
  methods: {
    Login(userInfo) {
        let salt = bcrypt.genSaltSync(11)
        let newPassword = bcrypt.hashSync(userInfo.password,salt)
        let formdata = new FormData()
        formdata.append("username",userInfo.userName)
        formdata.append("password",newPassword)
        formdata.append("enterpriseCode",'inner')
        fetch(urls.auth.login, formdata)
          .then(res => {
            const data = res.data.responseBody
            if (res.data.errorCode === 0) {
              data.password = userInfo.password
              sessionStorage.setItem('AUDITUSERINFO', JSON.stringify(data), 7 * 24 * 60 * 60 * 1000)
              sessionStorage.setItem('AUDITTOKEN', data.token, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', data.token)
              sessionStorage.setItem('AUDITROUTES', JSON.stringify(data.route), 7 * 24 * 60 * 60 * 1000)
            }
          })
    }
  }
}
</script>
<style>
</style>
