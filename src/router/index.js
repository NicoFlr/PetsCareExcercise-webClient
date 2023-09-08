import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import PetsView from '../views/pets/PetsView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'PetsView',
    component: PetsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  /*{
    path: '/orders',
    name: 'OrdersView',
    component: OrdersView,
    meta: {
      title: 'USA Autopartes',
    },
  },
  {
    path: '/orders/orders-consult',
    name: 'OrdersListView',
    component: OrdersListView,
    meta: {
      title: 'USA Autopartes',
    },
  },*/
]

const router = new VueRouter({ mode: 'history', routes });

export default router;
