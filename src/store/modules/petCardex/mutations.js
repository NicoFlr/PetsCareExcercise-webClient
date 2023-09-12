'use strict';

const setAllPetCardexes = (state, petCardexes) => {
  state.petCardexes = petCardexes;
};

const setPetCardexListPaginationProps = (state, { count, totalCount }) => {
  state.petCardexesPaginationProps.count = count;
  state.petCardexesPaginationProps.totalCount = totalCount;
};

const setAllDataPetCardexListPaginationProps = (
  state,
  { count, totalCount }
) => {
  state.allPetCardexesPaginatedProps.count = count;
  state.allPetCardexesPaginatedProps.totalCount = totalCount;
};

const addPetCardex = (state, PetCardexToAdd) => {
  state.petCardexes.push(PetCardexToAdd);
};

const updatePetCardex = (state, PetCardexToUpdate) => {
  const foundPetCardexIndex = state.petCardexes.findIndex(
    c => c.id === PetCardexToUpdate.id
  );
  if (foundPetCardexIndex >= 0) {
    state.petCardexes.splice(foundPetCardexIndex, 1, PetCardexToUpdate);
  }
};

const removePetCardex = (state, PetCardexToDeleteId) => {
  state.petCardexes = state.petCardexes.filter(
    c => c.id !== PetCardexToDeleteId
  );
};

export default {
  setAllPetCardexes,
  setPetCardexListPaginationProps,
  setAllDataPetCardexListPaginationProps,
  addPetCardex,
  updatePetCardex,
  removePetCardex
};
