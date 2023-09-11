<i18n src="./resources/locales.json"></i18n>

<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-form ref="speciesForm" v-model="isValid">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="required-field"
                  v-model="species.name"
                  :label="$t('name')"
                  :rules="[nameRules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="close">
            {{ $t('cancel') }}
          </v-btn>
          <v-btn color="primary" :disabled="!isValid" @click="save">
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SpeciesDetailModal',

  data() {
    return {
      isValid: false,
      species: {},
      dialog: false,
      defaultSpecies: {
        id: '-1',
        name: ''
      }
    };
  },

  computed: {
    formTitle() {
      const { id } = this.species;
      return id === '-1' ? this.$t('newSpecies') : this.$t('editSpecies');
    },

    nameRules() {
      return { required: value => !!value || this.$t('nameIsRequired') };
    }
  },

  methods: {
    ...mapActions('species', ['addSpecies', 'updateSpecies']),

    open(speciesToUpsert) {
      this.species = Object.assign({}, speciesToUpsert || this.defaultSpecies);
      this.dialog = true;
    },

    close() {
      this.resetValidations();
      this.isValid = false;
      this.species = Object.assign({}, this.defaultSpecies);
      this.dialog = false;
    },

    async save() {
      const { id } = this.species;
      this.species = Object.assign({}, this.species);

      if (id !== '-1') {
        try {
          await this.updateSpecies(this.species);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: this.$t('speciesInfoWasUpdatedSuccessfully'),
                messageType: 'success'
              }
            )
          );
        } catch (error) {
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: this.$t('errorWhileUpdatingspeciesInfoPleaseTryAgain'),
                messageType: 'error'
              }
            )
          );
        }
      } else {
        try {
          await this.addSpecies(this.species);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: `${this.$t('theSpecies')} ${this.species.name} ${
                  this.species.lastName
                } ${this.$t('wasCreatedSuccessfully')}`,
                messageType: 'success'
              }
            )
          );
        } catch (error) {
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: this.$t('errorWhileCreatingTheSpecies'),
                messageType: 'error'
              }
            )
          );
        }
      }

      this.close();
    },

    resetValidations() {
      this.$refs.speciesForm.resetValidation();
    }
  }
};
</script>
