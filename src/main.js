import './style.css'
import Vue from 'vue'
import router from '../router'
import App from './app.vue'

new (Vue.extend(App))({router}).$mount('#app');