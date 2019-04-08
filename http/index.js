import axios from 'axios'
import {Loading} from 'element-ui'

let loading;

let $http = axios.create({
  timeout: 20000
});

$http.interceptors.request.use(config => {
  if (config.lock) {
    loading = Loading.service({
      fullscreen: true,
      background: '#00000050',
      text: '数据加载中...'
    })
  }
  return config
});

$http.interceptors.response.use(response => {
  if (response.config.lock) {
    loading.close()
  }
});

export default {
  install(Vue) {
    Vue.prototype.$http = $http
  }
}