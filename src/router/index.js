/**
 * Created by 侯建东 946496545@qq.com on 2017/7/8.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods.vue';
import seller from 'components/seller/seller.vue';
import rating from  'components/rating/rating.vue';
Vue.use(VueRouter);
const routers = [
  {
    path: '',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/seller',
    component: seller
  },
  {
    path: '/rating',
    component: rating
  }
];
export default new VueRouter({
  linkActiveClass: 'active',
  routes: routers
})
