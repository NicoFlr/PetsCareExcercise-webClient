import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

import SpeciesView from '../views/species/SpeciesView.vue';
import BreedsView from '../views/breeds/BreedsView.vue';
import PetsView from '../views/pets/PetsView.vue';
import PetCardexesView from '../views/petCardexes/PetCardexesView.vue';
import OwnersView from '../views/owners/OwnersView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/species',
    name: 'Species',
    component: SpeciesView,
    meta: {
      title: 'Pets-Care'
    }
  },
  {
    path: '/pets',
    name: 'Pets',
    component: PetsView,
    meta: {
      title: 'Pets-Care'
    }
  },
  {
    path: '/breeds',
    name: 'Breeds',
    component: BreedsView,
    meta: {
      title: 'Pets-Care'
    }
  },
  {
    path: '/owners',
    name: 'Owners',
    component: OwnersView,
    meta: {
      title: 'Pets-Care'
    }
  },
  {
    path: '/petCardexes',
    name: 'PetCardexes',
    component: PetCardexesView,
    meta: {
      title: 'Pets-Care'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'Pets-Care'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Pets-Care'
    }
  }
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
];

const router = new VueRouter({ mode: 'history', routes });

export default router;
