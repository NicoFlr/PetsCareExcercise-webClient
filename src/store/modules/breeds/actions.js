'use strict';

import axios from 'axios';
import { PETSCARE_API_URL } from '../../../constants/Environment';

const retrieveAllBreeds = async ({ dispatch, commit }, options) => {
  dispatch('loading/setIsBreedLoading', true, { root: true });
  try {
    const { page, itemsPerPage } = options;
    await axios
      .get(
        `${PETSCARE_API_URL}/breeds?page=${page}&size=${itemsPerPage}`
      )
      .then(response => {
        commit('setAllBreeds', response.data._embedded.breeds);
        commit('setBreedListPaginationProps', {
          count: response.data.page.size,
          totalCount: response.data.page.totalElements
        });
      });
    dispatch('loading/setIsBreedLoading', false, { root: true });
  } catch (error) {
    console.error('There was an error while retrieving Breeds' + error);
  }
};

const addBreed = async ({ commit }, breedToAdd) => {
  delete breedToAdd.id;
  return new Promise((resolve, reject) => {
    axios
      .post(`${PETSCARE_API_URL}/breeds`, breedToAdd)
      .then(response => {
        commit('addBreed', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while posting the breed' + error);
      });
  });
};

const updateBreed = async ({ commit }, breedToUpdate) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${PETSCARE_API_URL}/breeds/${breedToUpdate.id}`, breedToUpdate)
      .then(response => {
        commit('updateBreed', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while updating the breed' + error);
      });
  });
};

const removeBreed = ({ commit }, breedToDeleteId) => {
  axios
    .delete(`${PETSCARE_API_URL}/breeds/${breedToDeleteId}`)
    .then(response => {
      commit('removeBreed', response.data.id);
    });
};

export default {
  retrieveAllBreeds,
  addBreed,
  updateBreed,
  removeBreed
};
