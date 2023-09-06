import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
  breeds: [],
  breedsPaginationProps: {
    count: null,
    totalCount: null
  },
  allbreedsPaginatedProps: {
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
