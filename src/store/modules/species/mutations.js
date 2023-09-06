'use strict';

const setAllSpecies = (state, species) => {
  state.species = species;
};

const setSpeciesListPaginationProps = (state, { count, totalCount }) => {
  state.speciesPaginationProps.count = count;
  state.speciesPaginationProps.totalCount = totalCount;
};

const setAllDataSpeciesListPaginationProps = (state, { count, totalCount }) => {
  state.allspeciesPaginatedProps.count = count;
  state.allspeciesPaginatedProps.totalCount = totalCount;
};

const addSpecies = (state, SpeciesToAdd) => {
  state.species.push(SpeciesToAdd);
};

const updateSpecies = (state, SpeciesToUpdate) => {
  const foundSpeciesIndex = state.species.findIndex(
    c => c.id === SpeciesToUpdate.id
  );
  if (foundSpeciesIndex >= 0) {
    state.species.splice(foundSpeciesIndex, 1, SpeciesToUpdate);
  }
};

const removeSpecies = (state, SpeciesToDeleteId) => {
  state.species = state.species.filter(c => c.id !== SpeciesToDeleteId);
};

export default {
  setAllSpecies,
  setSpeciesListPaginationProps,
  setAllDataSpeciesListPaginationProps,
  addSpecies,
  updateSpecies,
  removeSpecies
};
