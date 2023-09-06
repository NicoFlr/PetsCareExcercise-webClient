import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
  species: [],
  speciesPaginationProps: {
    count: null,
    totalCount: null
  },
  allspeciesPaginatedProps: {
    count: null,
    totalCount: null
  }
});

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
