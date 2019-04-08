import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/path1',
  },
  {
    path: '/path1',
    component: () => import(/* webpackChunkName: 'path1' */ '@components/path1.vue')  //路由懒加载
  },
  {
    path: '/path2',
    component: () => import(/* webpackChunkName: 'path2' */ '@components/path2.vue')
  },
  {
    path: '/path3',
    component: () => import(/* webpackChunkName: 'path3' */ '@components/path3.vue')
  }
];

export default new VueRouter({
  routes
})