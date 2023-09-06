'use strict';

const allBreeds = state => {
  return state.breeds.slice();
};

const getBreedListPaginationProps = state => {
  return Object.assign({}, state.breedsPaginationProps);
};

export default {
  allBreeds,
  getBreedListPaginationProps
};
