'use strict';

const setAllOwners = (state, owners) => {
  state.owners = owners;
};

const setOwnerListPaginationProps = (state, { count, totalCount }) => {
  state.ownersPaginationProps.count = count;
  state.ownersPaginationProps.totalCount = totalCount;
};

const setAllDataOwnerListPaginationProps = (state, { count, totalCount }) => {
  state.allownersPaginatedProps.count = count;
  state.allownersPaginatedProps.totalCount = totalCount;
};

const addOwner = (state, OwnerToAdd) => {
  state.owners.push(OwnerToAdd);
};

const updateOwner = (state, OwnerToUpdate) => {
  const foundOwnerIndex = state.owners.findIndex(
    c => c.id === OwnerToUpdate.id
  );
  if (foundOwnerIndex >= 0) {
    state.owners.splice(foundOwnerIndex, 1, OwnerToUpdate);
  }
};

const removeOwner = (state, OwnerToDeleteId) => {
  state.owners = state.owners.filter(c => c.id !== OwnerToDeleteId);
};

export default {
  setAllOwners,
  setOwnerListPaginationProps,
  setAllDataOwnerListPaginationProps,
  addOwner,
  updateOwner,
  removeOwner
};
