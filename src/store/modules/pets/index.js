import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
  pets: [],
  petsPaginationProps: {
    count: null,
    totalCount: null
  },
  allpetsPaginatedProps: {
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
