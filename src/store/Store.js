import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

import breeds from './modules/breeds';
import owners from './modules/owners';
import petCardex from './modules/petCardex';
import pets from './modules/pets';
import species from './modules/species';
import loading from './modules/loading';
import languageStorage from './modules/languageStorage';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = {
  modules: {
    breeds,
    owners,
    petCardex,
    pets,
    species,
    loading,
    languageStorage
  }
};

export default new Vuex.Store(store);
