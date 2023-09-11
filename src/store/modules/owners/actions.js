'use strict';

import axios from 'axios';
import { PETSCARE_API_URL } from '../../../constants/Environment';

const retrieveAllOwners = async ({ dispatch, commit }) => {
  dispatch('loading/setIsOwnerLoading', true, { root: true });
  try {
    await axios.get(`${PETSCARE_API_URL}/owners`).then(response => {
      commit('setAllOwners', response.data);
    });
    dispatch('loading/setIsOwnerLoading', false, { root: true });
  } catch (error) {
    console.error('There was an error while retrieving owners' + error);
  }
};

const retrieveAllOwnersPagination = async ({ dispatch, commit }, options) => {
  dispatch('loading/setIsOwnerLoading', true, { root: true });
  try {
    const { page, itemsPerPage } = options;
    await axios
      .get(`${PETSCARE_API_URL}/owners?page=${page}&size=${itemsPerPage}`)
      .then(response => {
        commit('setAllOwners', response.data);
        commit('setOwnerListPaginationProps', {
          count: response.data.page.size,
          totalCount: response.data.page.totalElements
        });
      });
    dispatch('loading/setIsOwnerLoading', false, { root: true });
  } catch (error) {
    console.error('There was an error while retrieving owners' + error);
  }
};

const addOwner = async ({ commit }, ownerToAdd) => {
  delete ownerToAdd.id;
  return new Promise((resolve, reject) => {
    axios
      .post(`${PETSCARE_API_URL}/owners`, ownerToAdd)
      .then(response => {
        commit('addOwner', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while posting the owner' + error);
      });
  });
};

const updateOwner = async ({ commit }, ownerToUpdate) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${PETSCARE_API_URL}/owners/${ownerToUpdate.id}`, ownerToUpdate)
      .then(response => {
        commit('updateOwner', response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.error('There was an error while updating the owner' + error);
      });
  });
};

const removeOwner = ({ commit }, ownerToDeleteId) => {
  axios
    .delete(`${PETSCARE_API_URL}/owners/${ownerToDeleteId}`)
    .then(response => {
      commit('removeOwner', response.data.id);
    });
};

export default {
  retrieveAllOwners,
  retrieveAllOwnersPagination,
  addOwner,
  updateOwner,
  removeOwner
};
