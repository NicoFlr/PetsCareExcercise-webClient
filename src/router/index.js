import Vue from 'vue';
import VueRouter from 'vue-router';

import SpeciesView from '../views/species/SpeciesView.vue';
import BreedsView from '../views/breeds/BreedsView.vue';
import PetsView from '../views/pets/PetsView.vue';
import PetCardexesView from '../views/petCardexes/PetCardexesView.vue';
import OwnersView from '../views/owners/OwnersView.vue';

import Settings from '../views/settings/Settings.vue';

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
    path: '/',
    name: 'Pets',
    component: PetsView,
    alias: '/pets',
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
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'Rectificadora'
    }
  }
];

const router = new VueRouter({ mode: 'history', routes });

export default router;
