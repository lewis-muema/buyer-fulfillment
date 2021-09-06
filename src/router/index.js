import Vue from 'vue';
import VueRouter from 'vue-router';
import fullfillment from '../components/fulfillment/fulfillment.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'fulfillment',
    component: fullfillment,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
