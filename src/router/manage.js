import { ifAuthenticated, ifNotAuthenticated } from '@/router/helpers';
import Login from '@/views/Login';
import Index from '@/views/Manage/index';
import Companies from '@/views/Manage/Companies';
import Banners from '@/views/Manage/Banners';
import Partners from '@/views/Manage/Partners';
import Services from '@/views/Manage/Services';

export default [
  {
    path: '/',
    name: 'Home',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/manage',
    component: Index,
    meta: {
      title: 'Manage',
    },
    children: [
      {
        path: '',
        name: 'Companies',
        component: Companies,
      },
      {
        path: 'banners',
        name: 'Banners',
        component: Banners,
      },
      {
        path: 'partners',
        name: 'Partners',
        component: Partners,
      },
      {
        path: 'services',
        name: 'Services',
        component: Services,
      },
    ],
    beforeEnter: ifAuthenticated,
  },
];
