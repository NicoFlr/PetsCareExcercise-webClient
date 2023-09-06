import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
  owners: [],
  ownersPaginationProps: {
    count: null,
    totalCount: null
  },
  allownersPaginatedProps: {
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
