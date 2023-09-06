'use strict';

const setAllPets = (state, pets) => {
  state.pets = pets;
};

const setPetListPaginationProps = (state, { count, totalCount }) => {
  state.petsPaginationProps.count = count;
  state.petsPaginationProps.totalCount = totalCount;
};

const setAllDataPetListPaginationProps = (state, { count, totalCount }) => {
  state.allpetsPaginatedProps.count = count;
  state.allpetsPaginatedProps.totalCount = totalCount;
};

const addPet = (state, PetToAdd) => {
  state.pets.push(PetToAdd);
};

const updatePet = (state, PetToUpdate) => {
  const foundPetIndex = state.pets.findIndex(
    c => c.id === PetToUpdate.id
  );
  if (foundPetIndex >= 0) {
    state.pets.splice(foundPetIndex, 1, PetToUpdate);
  }
};

const removePet = (state, PetToDeleteId) => {
  state.pets = state.pets.filter(c => c.id !== PetToDeleteId);
};

export default {
  setAllPets,
  setPetListPaginationProps,
  setAllDataPetListPaginationProps,
  addPet,
  updatePet,
  removePet
};
