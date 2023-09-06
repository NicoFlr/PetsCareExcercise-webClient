'use strict';

import axios from 'axios';
import { PETSCARE_API_URL } from '../../../constants/Environment';

const retrieveAllPetCardexes = async ({ dispatch, commit }, options) => {
  dispatch('loading/setIsPetCardexLoading', true, { root: true });
  try {
    const { page, itemsPerPage } = options;
    await axios
      .get(
        `${PETSCARE_API_URL}/petcardexes?page=${page}&size=${itemsPerPage}`
      )
      .then(response => {
        commit('setAllPetCardexes', response.data._embedded.petcardexes);
        commit('setPetCardexListPaginationProps', {
          count: response.data.page.size,
          totalCount: response.data.page.totalElements
        });
      });
    dispatch('loading/setIsPetCardexLoading', false, { root: true });
  } catch (error) {
    console.error('There was an error while retrieving PetCardexes' + error);
  }
};

const addPetCardex = async ({ commit }, petCardexToAdd) => {
  delete petCardexToAdd.id;
  return new Promise((resolve, reject) => {
    axios
      .post(`${PETSCARE_API_URL}/petCardexes`, petCardexToAdd)
      .then(response => {
        commit('addPetCardex', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while posting the pet cardex' + error);
      });
  });
};

const updatePetCardex = async ({ commit }, petCardexToUpdate) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${PETSCARE_API_URL}/petcardexes/${petCardexToUpdate.id}`, petCardexToUpdate)
      .then(response => {
        commit('updatePetCardex', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while updating the petCardex' + error);
      });
  });
};

const removePetCardex = ({ commit }, petCardexToDeleteId) => {
  axios
    .delete(`${PETSCARE_API_URL}/petcardexes/${petCardexToDeleteId}`)
    .then(response => {
      commit('removePetCardex', response.data.id);
    });
};

export default {
  retrieveAllPetCardexes,
  addPetCardex,
  updatePetCardex,
  removePetCardex
};
