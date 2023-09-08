'use strict';

const retrieveStoredLanguage = ({ commit }) => {
  let value;
  value = window.localStorage.getItem('language');
  commit('setStoredLanguage', value);
};

const updateStoredLanguage = ({ commit }, languageToUpdate) => {
  window.localStorage.setItem('language', languageToUpdate);
  commit('setStoredLanguage', languageToUpdate);
};

export default {
  retrieveStoredLanguage,
  updateStoredLanguage
};
