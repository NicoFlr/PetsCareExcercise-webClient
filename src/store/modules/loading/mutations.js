'use strict';

const setLoading = (state, loadingToSet) => {
  state.loading = loadingToSet;
};

const setIsBreedLoading = (state, loadingToSet) => {
  state.isBreedLoading = loadingToSet;
};

const setIsOwnerLoading = (state, loadingToSet) => {
  state.isOwnerLoading = loadingToSet;
};

const setIsPetLoading = (state, loadingToSet) => {
  state.isPetLoading = loadingToSet;
};

const setIsPetCardexLoading = (state, loadingToSet) => {
  state.isPetCardexLoading = loadingToSet;
};

const setIsSpeciesLoading = (state, loadingToSet) => {
  state.isSpeciesLoading = loadingToSet;
};

export default {
  setLoading,
  setIsBreedLoading,
  setIsOwnerLoading,
  setIsPetLoading,
  setIsPetCardexLoading,
  setIsSpeciesLoading
};
