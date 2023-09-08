import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
  loading: false,
  isBreedLoading: false,
  isPetLoading: false,
  isOwnerLoading: false,
  isPetCardexLoading: false,
  isSpeciesLoading: false,
});

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
