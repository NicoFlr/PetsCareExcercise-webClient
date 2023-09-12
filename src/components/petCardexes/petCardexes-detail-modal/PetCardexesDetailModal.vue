<i18n src="./resources/locales.json"></i18n>

<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-form ref="petCardexForm" v-model="isValid">
        <v-card-text>
          <v-container>
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
                      :label="$t('date')"
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
                    :label="`${$t('visitDate')} (${$t('optional')})`"
                    v-model="petCardex.visitDate"
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
                  v-model="petCardex.description"
                  :label="`${$t('description')} (${$t('optional')})`"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="petCardex.medication"
                  :label="`${$t('medication')} (${$t('optional')})`"
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
          <v-btn color="primary" @click="save">
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'PetCardexesDetailModal',

  data() {
    return {
      isValid: false,
      petId: '',
      currentDate: moment().format('YYYY-MM-DD'),
      petCardex: {},
      date: '',
      calendarMenu: false,
      dialog: false,
      defaultPetCardex: {
        id: '-1',
        visitDate: '',
        petId: this.petId,
        description: '',
        medication: ''
      }
    };
  },

  computed: {
    formTitle() {
      const { id } = this.petCardex;
      return id === '-1' ? this.$t('newPetCardex') : this.$t('editPetCardex');
    },
    visitDateRules() {
      return { required: value => !!value || this.$t('idIsRequired') };
    },

    dateRangeText() {
      return this.petCardex.visitDate;
    }
  },

  methods: {
    ...mapActions('petCardexes', ['addPetCardex', 'updatePetCardex']),

    open(petCardexToUpsert) {
      this.petCardex = Object.assign(
        {},
        petCardexToUpsert || this.defaultPetCardex
      );
      this.dialog = true;
    },

    close() {
      this.resetValidations();
      this.isValid = false;
      this.petCardex = Object.assign({}, this.defaultPetCardex);
      this.dialog = false;
    },

    async save() {
      const { id } = this.petCardex;
      this.petCardex = Object.assign({}, this.petCardex);

      if (id !== '-1') {
        try {
          await this.updatePetCardex(this.petCardex);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: this.$t('petCardexInfoWasUpdatedSuccessfully'),
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
                message: this.$t(
                  'errorWhileUpdatingPetCardexInfoPleaseTryAgain'
                ),
                messageType: 'error'
              }
            )
          );
        }
      } else {
        try {
          await this.addPetCardex(this.petCardex);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: `${this.$t('thePetCardex')} ${
                  this.petCardex.firstName
                } ${this.petCardex.lastName} ${this.$t(
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
                message: this.$t('errorWhileCreatingThePetCardex'),
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
      this.$refs.petCardexForm.resetValidation();
    },

    cleanDateField() {
      this.calendarMenu = false;
      this.date = '';
    }
  }
};
</script>
