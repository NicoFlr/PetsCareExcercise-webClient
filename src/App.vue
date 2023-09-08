<i18n src="./resources/locales.json"></i18n>
<template>
  <v-app>
    <v-app-bar color="primaryVariant3" app clipped-left flat>
      <v-toolbar-title class="primaryVariant2--text">{{
        $t('petsCareSystem')
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon
        color="primaryVariant3"
        @click="$router.push({ path: 'settings' })"
      >
        mdi-cog-outline
      </v-icon>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',

 // components: {},

  /*data() {
    return {
      drawer: false,
      mini: true,
      subServicesGroupOpened: false
    };
  },*/

  computed: {
    ...mapGetters('languageStorage', ['getStoredLanguage']),
    //...mapGetters('userStorage', ['getUserStorageFullName']),
    //...mapGetters('roles', ['getAdminId', 'getSupervisorId', 'getCashierId'])
  },

  created() {
    this.retrieveAllBreeds();
    this.retrieveAllSpecies();
    //this.retrieveAllPets();
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
    }
  }
};
</script>

<style scoped>
@import './ScopedStyles.css';
</style>
