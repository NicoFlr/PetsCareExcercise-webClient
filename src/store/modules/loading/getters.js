'use strict';

const getLoading = state => {
  return state.loading;
};

const getIsBreedLoading = state => {
  return state.isBreedLoading;
};

const getIsPetLoading = state => {
  return state.isPetLoading;
};

const getIsOwnerLoading = state => {
  return state.isOwnerLoading;
};

const getIsPetCardexLoading = state => {
  return state.isPetCardexLoading;
};

const getIsSpeciesLoading = state => {
  return state.isSpeciesLoading;
};

export default {
  getLoading,
  getIsBreedLoading,
  getIsPetLoading,
  getIsOwnerLoading,
  getIsPetCardexLoading,
  getIsSpeciesLoading
};
