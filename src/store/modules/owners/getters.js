'use strict';

const allOwners = state => {
  return state.owners.slice();
};

const getOwnerListPaginationProps = state => {
  return Object.assign({}, state.ownersPaginationProps);
};

export default {
  allOwners,
  getOwnerListPaginationProps
};
