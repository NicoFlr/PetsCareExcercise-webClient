'use strict';

const setLoadingOnTrue = ({ commit }) => {
  commit('setLoading', true);
};

const setLoadingOnFalse = ({ commit }) => {
  commit('setLoading', false);
};

const setIsBreedLoading = ({ commit }, loadingToSet) => {
  commit('setIsBreedLoading', loadingToSet);
};

const setIsOwnerLoading = ({ commit }, loadingToSet) => {
  commit('setIsOwnerLoading', loadingToSet);
};

const setIsPetLoading = ({ commit }, loadingToSet) => {
  commit('setIsPetLoading', loadingToSet);
};

const setIsPetCardexLoading = ({ commit }, loadingToSet) => {
  commit('setIsPetCardexLoading', loadingToSet);
};

const setIsSpeciesLoading = ({ commit }, loadingToSet) => {
  commit('setIsSpeciesLoading', loadingToSet);
};

export default {
  setLoadingOnTrue,
  setLoadingOnFalse,
  setIsBreedLoading,
  setIsOwnerLoading,
  setIsPetLoading,
  setIsPetCardexLoading,
  setIsSpeciesLoading
};
