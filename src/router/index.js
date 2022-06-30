import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '@/views/NotFound';
import manageRoutes from '@/router/manage';

Vue.use(VueRouter);

const routes = [
  ...manageRoutes,
  {
    // will match everything
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
