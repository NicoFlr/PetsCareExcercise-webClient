'use strict';

const setAllBreeds = (state, breeds) => {
  state.breeds = breeds;
};

const setBreedListPaginationProps = (state, { count, totalCount }) => {
  state.breedsPaginationProps.count = count;
  state.breedsPaginationProps.totalCount = totalCount;
};

const setAllDataBreedListPaginationProps = (state, { count, totalCount }) => {
  state.allbreedsPaginatedProps.count = count;
  state.allbreedsPaginatedProps.totalCount = totalCount;
};

const addBreed = (state, BreedToAdd) => {
  state.breeds.push(BreedToAdd);
};

const updateBreed = (state, BreedToUpdate) => {
  const foundBreedIndex = state.breeds.findIndex(
    c => c.id === BreedToUpdate.id
  );
  if (foundBreedIndex >= 0) {
    state.breeds.splice(foundBreedIndex, 1, BreedToUpdate);
  }
};

const removeBreed = (state, BreedToDeleteId) => {
  state.breeds = state.breeds.filter(c => c.id !== BreedToDeleteId);
};

export default {
  setAllBreeds,
  setBreedListPaginationProps,
  setAllDataBreedListPaginationProps,
  addBreed,
  updateBreed,
  removeBreed
};
