import { createRouter, createWebHistory } from 'vue-router';
import fulfillment from '../components/fulfillment/fulfillment.vue';

const routes = [
  {
    path: '/:deliveryId',
    name: 'fulfillment',
    component: fulfillment,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
