import axios from 'axios'
import {Loading} from 'element-ui'

let loading;

let $http = axios.create({
  timeout: 20000
});

const handled = (error) => {
  if (!error.handled) {
    alert(error.message)
  }
  return Promise.reject(error)
};

$http.interceptors.request.use(config => {
  if (config.lock) {
    loading = Loading.service({
      fullscreen: true,
      background: '#ffffff50',
      text: '数据加载中...'
    })
  }
  return config
});

$http.interceptors.response.use(response => {
  if (response.config.lock) {
    loading.close()
  }
  if (response.data.code === 200) {
    return response.data.result
  } else {
    return handled(response.data)
  }
});

export default {
  install(Vue) {
    Vue.prototype.$http = $http
  }
}