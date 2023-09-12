<i18n src="./resources/locales.json"></i18n>
<template>
  <v-app>
    <v-app-bar color="primaryVariant3" app clipped-left flat>
      <v-toolbar-title class="primaryVariant2--text">{{
        $t('petsCareSystem')
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon color="white" @click="$router.push({ path: 'settings' })">
        mdi-cog-outline
      </v-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      flat
      clipped
      fixed
      permanent
      width="11%"
    >
      <v-list-item
        class="selected-tile"
        active-class="selected-tile-active"
        v-for="item in getNavigationItems()"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon color="primaryVariant1">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content @click="$router.push({ path: item.path })">
          <v-list-item-title class="text-wrap">{{
            $t(item.title)
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { MAIN_ITEMS } from '@/constants/NavigationConstants';

export default {
  name: 'App',

  data() {
    return {
      drawer: false,
      mini: true,
      subServicesGroupOpened: false
    };
  },

  computed: {
    ...mapGetters('languageStorage', ['getStoredLanguage'])
  },

  created() {
    this.retrieveAllBreeds();
    this.retrieveAllSpecies();

    this.retrieveStoredLanguage();

    this.setThemeSettings();
    this.setLanguage();
  },

  methods: {
    ...mapActions('breeds', ['retrieveAllBreeds']),
    ...mapActions('species', ['retrieveAllSpecies']),
    ...mapActions('pets', ['retrieveAllPets']),
    ...mapActions('languageStorage', ['retrieveStoredLanguage']),

    isLoggedIn() {
      return window.localStorage.getItem('token');
    },

    setThemeSettings() {
      let settings = window.localStorage.getItem('settings');

      if (settings) {
        settings = JSON.parse(settings);
        this.$vuetify.theme.dark = settings.darkMode;
      }
    },

    setLanguage() {
      if (this.getStoredLanguage !== null) {
        this.$root.$i18n.locale = this.getStoredLanguage;
      }
    },

    getNavigationItems() {
      return MAIN_ITEMS;
    }
  }
};
</script>

<style scoped>
@import './ScopedStyles.css';
</style>
