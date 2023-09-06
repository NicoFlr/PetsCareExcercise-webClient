import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

import breeds from './modules/breeds';
import owners from './modules/owners';
import petCardex from './modules/petCardex';
import pets from './modules/pets';
import species from './modules/species';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = {
  modules: {
    breeds,
    owners,
    petCardex,
    pets,
    species
  }
};

export default new Vuex.Store(store);
