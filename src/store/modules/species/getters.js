'use strict';

const allSpecies = state => {
  return state.species.slice();
};

const getSpeciesListPaginationProps = state => {
  return Object.assign({}, state.speciesPaginationProps);
};

export default {
  allSpecies,
  getSpeciesListPaginationProps
};
