'use strict';

import axios from 'axios';
import { PETSCARE_API_URL } from '../../../constants/Environment';

const retrieveAllPets = async ({ dispatch, commit }, options) => {
  dispatch('loading/setIsPetLoading', true, { root: true });
  try {
    const { page, itemsPerPage } = options;
    await axios
      .get(
        `${PETSCARE_API_URL}/pets?page=${page}&size=${itemsPerPage}`
      )
      .then(response => {
        commit('setAllPets', response.data._embedded.pets);
        commit('setPetListPaginationProps', {
          count: response.data.page.size,
          totalCount: response.data.page.totalElements
        });
      });
    dispatch('loading/setIsPetLoading', false, { root: true });
  } catch (error) {
    console.error('There was an error while retrieving pets' + error);
  }
};

const addPet = async ({ commit }, petToAdd) => {
  delete petToAdd.id;
  return new Promise((resolve, reject) => {
    axios
      .post(`${PETSCARE_API_URL}/pets`, petToAdd)
      .then(response => {
        commit('addPet', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while posting the pet' + error);
      });
  });
};

const updatePet = async ({ commit }, petToUpdate) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${PETSCARE_API_URL}/pets/${petToUpdate.id}`, petToUpdate)
      .then(response => {
        commit('updatePet', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while updating the pet' + error);
      });
  });
};

const removePet = ({ commit }, petToDeleteId) => {
  axios
    .delete(`${PETSCARE_API_URL}/pets/${petToDeleteId}`)
    .then(response => {
      commit('removePet', response.data.id);
    });
};

export default {
  retrieveAllPets,
  addPet,
  updatePet,
  removePet
};
