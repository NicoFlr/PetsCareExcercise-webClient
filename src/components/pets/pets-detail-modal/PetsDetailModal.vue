<i18n src="./resources/locales.json"></i18n>

<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-form ref="petForm" v-model="isValid">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="required-field"
                  v-model="pet.name"
                  :label="$t('name')"
                  :rules="[nameRules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  :items="allSpecies"
                  dense
                  item-text="name"
                  item-value="id"
                  class="required-field"
                  v-model="pet.speciesId"
                  :label="$t('species')"
                  :rules="[speciesRules.required]"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="allBreeds"
                  dense
                  item-text="name"
                  item-value="id"
                  class="required-field"
                  v-model="pet.breedId"
                  :label="$t('breed')"
                  :rules="[breedRules.required]"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="allOwners"
                  dense
                  item-text="fullName"
                  item-value="id"
                  class="required-field"
                  v-model="pet.ownerId"
                  :label="$t('owner')"
                  :rules="[ownerRules.required]"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  ref="calendarMenu"
                  v-model="calendarMenu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="dateRangeText"
                      :label="$t('birthDate')"
                      ref="calendarMenuTextField"
                      prepend-inner-icon="mdi-calendar"
                      background-color="primaryVariant2"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details
                      variant="underlined"
                      dense
                      flat
                      clearable
                      @click:clear="cleanDateField"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="calendarMenuDatePicker"
                    :label="`${$t('birthDate')} (${$t('optional')})`"
                    v-model="pet.dateOfBirth"
                    scrollable
                    show-adjacent-months
                    no-title
                    optional
                    :max="currentDate"
                    :locale="$i18n.locale"
                    color="primary"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="calendarMenu = false">
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn color="primary" @click="savePickedDate">
                      {{ $t('ok') }}
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model.number="pet.notes"
                  :label="$t('notes')"
                ></v-textarea>
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
import moment from 'moment';

export default {
  name: 'PetsDetailModal',

  data() {
    return {
      isValid: false,
      currentDate: moment().format('YYYY-MM-DD'),
      pet: {},
      date: '',
      calendarMenu: false,
      dialog: false,
      defaultPet: {
        id: '-1',
        name: '',
        dateOfBirth: '',
        speciesId: '',
        BreedId: '',
        notes: '',
        ownerId: ''
      }
    };
  },

  computed: {
    formTitle() {
      const { id } = this.pet;
      return id === '-1' ? this.$t('newPet') : this.$t('editPet');
    },

    nameRules() {
      return { required: value => !!value || this.$t('nameIsRequired') };
    },

    breedRules() {
      return { required: value => !!value || this.$t('breedIsRequired') };
    },

    speciesRules() {
      return { required: value => !!value || this.$t('speciesIsRequired') };
    },
    ownerRules() {
      return { required: value => !!value || this.$t('ownerIsRequired') };
    },

    dateRangeText() {
      return this.pet.dateOfBirth;
    },

    ...mapGetters('species', ['allSpecies']),
    ...mapGetters('breeds', ['allBreeds']),
    ...mapGetters('owners', ['allOwners'])
  },

  methods: {
    ...mapActions('pets', ['addPet', 'updatePet']),
    ...mapActions('owners', ['retrieveAllOwners']),
    ...mapActions('breeds', ['retrieveAllBreeds']),
    ...mapActions('species', ['retrieveAllSpecies']),

    open(petToUpsert) {
      this.retrieveAllOwners();
      this.retrieveAllBreeds();
      this.retrieveAllSpecies();
      this.pet = Object.assign({}, petToUpsert || this.defaultPet);
      this.dialog = true;
    },

    close() {
      this.resetValidations();
      this.isValid = false;
      this.pet = Object.assign({}, this.defaultPet);
      this.dialog = false;
    },

    getSpeciesName(idOfSpecies) {
      const species = this.allSpecies.find(s => s.id === idOfSpecies);

      return species.name;
    },

    getBreedName(idOfBreed) {
      const breed = this.allBreeds.find(s => s.id === idOfBreed);

      return breed.name;
    },

    getOwnerName(idOfOwner) {
      const owner = this.allOwners.find(s => s.id === idOfOwner);

      return owner.name;
    },

    async save() {
      const { id } = this.pet;

      const speciesName = this.getSpeciesName(this.pet.speciesId);
      const breedName = this.getBreedName(this.pet.breedId);
      const ownerName = this.getOwnerName(this.pet.ownerId);

      this.pet.newSpeciesName = speciesName;
      this.pet.newBreedName = breedName;
      this.pet.newOwnerName = ownerName;

      this.pet = Object.assign({}, this.pet);

      if (id !== '-1') {
        try {
          await this.updatePet(this.pet);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: this.$t('petInfoWasUpdatedSuccessfully'),
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
                message: this.$t('errorWhileUpdatingPetInfoPleaseTryAgain'),
                messageType: 'error'
              }
            )
          );
        }
      } else {
        try {
          await this.addPet(this.pet);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: `${this.$t('thePet')} ${this.pet.firstName} ${
                  this.pet.lastName
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
                message: this.$t('errorWhileCreatingThePet'),
                messageType: 'error'
              }
            )
          );
        }
      }

      this.close();
    },

    savePickedDate() {
      this.$refs.calendarMenu.save(this.dates);
    },

    resetValidations() {
      this.$refs.petForm.resetValidation();
    },

    cleanDateField() {
      this.calendarMenu = false;
      this.date = '';
    }
  }
};
</script>
