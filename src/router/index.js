import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/index';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
    },
    /*{
      path: '/about',
      name: 'About',*/
      //component: () => import(/* webpackChunkName: "about" */ '@/views/About'),
    //},
  ],
});