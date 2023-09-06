import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
  petCardexes: [],
  petCardexesPaginationProps: {
    count: null,
    totalCount: null
  },
  allpetCardexesPaginatedProps: {
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
