import './style.css'
import Vue from 'vue'
import router from './router'
import App from './app.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $http from './http'

Vue.use($http)
Vue.use(ElementUI)

new (Vue.extend(App))({ router }).$mount('#app')
