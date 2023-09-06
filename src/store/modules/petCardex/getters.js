'use strict';

const allPetCardexes = state => {
  return state.petCardexes.slice();
};

const getPetCardexListPaginationProps = state => {
  return Object.assign({}, state.petCardexesPaginationProps);
};

export default {
  allPetCardexes,
  getPetCardexListPaginationProps
};
