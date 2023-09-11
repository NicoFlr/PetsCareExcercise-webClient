'use strict';

import axios from 'axios';
import { PETSCARE_API_URL } from '../../../constants/Environment';

const retrieveAllSpecies = async ({ dispatch, commit }) => {
  dispatch('loading/setIsSpeciesLoading', true, { root: true });
  try {
    await axios.get(`${PETSCARE_API_URL}/species`).then(response => {
      commit('setAllSpecies', response.data);
    });
    dispatch('loading/setIsSpeciesLoading', false, { root: true });
  } catch (error) {
    console.error('There was an error while retrieving species' + error);
  }
};

const retrieveAllSpeciesWithPagination = async (
  { dispatch, commit },
  options
) => {
  dispatch('loading/setIsSpeciesLoading', true, { root: true });
  try {
    const { page, itemsPerPage } = options;
    await axios
      .get(`${PETSCARE_API_URL}/species?page=${page}&size=${itemsPerPage}`)
      .then(response => {
        commit('setAllSpecies', response.data);
        commit('setSpeciesListPaginationProps', {
          count: response.data.page.size,
          totalCount: response.data.page.totalElements
        });
      });
    dispatch('loading/setIsSpeciesLoading', false, { root: true });
  } catch (error) {
    console.error('There was an error while retrieving species' + error);
  }
};

const addSpecies = async ({ commit }, speciesToAdd) => {
  delete speciesToAdd.id;
  return new Promise((resolve, reject) => {
    axios
      .post(`${PETSCARE_API_URL}/species`, speciesToAdd)
      .then(response => {
        commit('addSpecies', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while posting the species' + error);
      });
  });
};

const updateSpecies = async ({ commit }, speciesToUpdate) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${PETSCARE_API_URL}/species/${speciesToUpdate.id}`, speciesToUpdate)
      .then(response => {
        commit('updateSpecies', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while updating the species' + error);
      });
  });
};

const removeSpecies = ({ commit }, speciesToDeleteId) => {
  axios
    .delete(`${PETSCARE_API_URL}/species/${speciesToDeleteId}`)
    .then(response => {
      commit('removeSpecies', response.data.id);
    });
};

export default {
  retrieveAllSpecies,
  retrieveAllSpeciesWithPagination,
  addSpecies,
  updateSpecies,
  removeSpecies
};
