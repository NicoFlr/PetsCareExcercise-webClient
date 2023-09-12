<i18n src="./resources/locales.json"></i18n>

<template>
  <v-container>
    <h1 class="ml-3 primary--text">{{ $t('settings') }}</h1>
    <div class="mt-10 ml-16 mb-n12 mr-16">
      <br />
      <h3>{{ $t('preferenceLanguage') }}</h3>
      <p>{{ $t('choosePreferenceLanguageToNavigate') }}</p>
      <v-form ref="languageForm">
        <v-radio-group @change="save" v-model="selectedLanguage" column>
          <v-radio :label="$t('english')" value="en"></v-radio>
          <v-radio :label="$t('spanish')" value="es"></v-radio>
        </v-radio-group>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Settings',

  data() {
    return {
      selectedLanguage: ''
    };
  },

  created() {
    this.getSelectedLanguage();
  },

  computed: {
    ...mapGetters('languageStorage', ['getStoredLanguage'])
  },

  methods: {
    ...mapActions('languageStorage', ['updateStoredLanguage']),

    changeTheme() {
      window.localStorage.setItem(
        'settings',
        `{"darkMode":${this.$vuetify.theme.dark}}`
      );
    },

    getSelectedLanguage() {
      if (this.getStoredLanguage !== null) {
        this.selectedLanguage = this.getStoredLanguage;
      } else {
        this.selectedLanguage = this.$i18n.locale;
      }
    },

    save() {
      if (this.selectedLanguage !== this.getStoredLanguage) {
        this.$root.$i18n.locale = this.selectedLanguage;
        this.updateStoredLanguage(this.selectedLanguage);
      }
    }
  }
};
</script>
