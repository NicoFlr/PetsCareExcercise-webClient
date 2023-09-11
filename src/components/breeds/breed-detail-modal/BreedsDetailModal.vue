<i18n src="./resources/locales.json"></i18n>

<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-form ref="breedForm" v-model="isValid">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="required-field"
                  v-model="breed.name"
                  :label="$t('name')"
                  :rules="[nameRules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-select
                  :items="allSpecies"
                  dense
                  item-text="name"
                  item-value="id"
                  class="required-field"
                  v-model="breed.speciesId"
                  :label="$t('species')"
                  :rules="[speciesRules.required]"
                  required
                ></v-select>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BreedDetailModal',

  data() {
    return {
      isValid: false,
      breed: {},
      dialog: false,
      defaultBreed: {
        id: '-1',
        name: '',
        speciesId: ''
      },
      selectedSpecies: {}
    };
  },

  computed: {
    formTitle() {
      const { id } = this.breed;
      return id === '-1' ? this.$t('newBreed') : this.$t('editBreed');
    },

    nameRules() {
      return { required: value => !!value || this.$t('nameIsRequired') };
    },
    speciesRules() {
      return { required: value => !!value || this.$t('speciesIsRequired') };
    },
    ...mapGetters('species', ['allSpecies'])
  },

  methods: {
    ...mapActions('breeds', ['addBreed', 'updateBreed']),
    ...mapActions('species', ['retrieveAllSpecies']),

    open(breedToUpsert) {
      this.breed = Object.assign({}, breedToUpsert || this.defaultBreed);
      this.retrieveAllSpecies();
      this.dialog = true;
    },

    close() {
      this.resetValidations();
      this.isValid = false;
      this.breed = Object.assign({}, this.defaultBreed);
      this.dialog = false;
    },

    getSpeciesName(idOfSpecies) {
      //const speciesArray = this.allSpecies.filter(d=> d.id === idOfSpecies);
      const species = this.allSpecies.find(s => s.id === idOfSpecies);

      return species.name;
    },

    async save() {
      const { id } = this.breed;
      const speciesName = this.getSpeciesName(this.breed.speciesId);
      this.breed.newSpeciesName = speciesName;

      this.breed = Object.assign({}, this.breed);

      if (id !== '-1') {
        try {
          await this.updateBreed(this.breed);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: this.$t('breedInfoWasUpdatedSuccessfully'),
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
                message: this.$t('errorWhileUpdatingbreedInfoPleaseTryAgain'),
                messageType: 'error'
              }
            )
          );
        }
      } else {
        try {
          await this.addBreed(this.breed);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: `${this.$t('theBreed')} ${this.breed.name} ${this.$t(
                  'wasCreatedSuccessfully'
                )}`,
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
                message: this.$t('errorWhileCreatingTheBreed'),
                messageType: 'error'
              }
            )
          );
        }
      }

      this.close();
    },

    resetValidations() {
      this.$refs.breedForm.resetValidation();
    }
  }
};
</script>
