import { createRouter, createWebHistory } from 'vue-router';
import CountryList from './components/CountryList.vue';
import CountryDetails from './components/CountryDetails.vue';

const routes = [
  {
    path: '/',
    name: 'CountryList',
    component: CountryList,
  },
  {
    path: '/country/:code',
    name: 'CountryDetails',
    component: CountryDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

export default router;