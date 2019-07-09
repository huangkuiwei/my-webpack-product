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
    component: () => import(/* webpackChunkName: 'path1' */ '@views/path1.vue')  //路由懒加载
  },
  {
    path: '/path2',
    component: () => import(/* webpackChunkName: 'path2' */ '@views/path2.vue')
  },
  {
    path: '/path3',
    component: () => import(/* webpackChunkName: 'path3' */ '@views/path3.vue')
  }
];

export default new VueRouter({
  routes
})