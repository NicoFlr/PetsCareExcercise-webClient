'use strict';

const allPets = state => {
  return state.pets.slice();
};

const getPetListPaginationProps = state => {
  return Object.assign({}, state.petsPaginationProps);
};

export default {
  allPets,
  getPetListPaginationProps
};
