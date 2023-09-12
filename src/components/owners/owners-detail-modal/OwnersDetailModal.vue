<i18n src="./resources/locales.json"></i18n>

<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-form ref="ownerForm" v-model="isValid">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="required-field"
                  v-model.number="owner.ownerId"
                  :label="$t('id')"
                  type="number"
                  :rules="[idRules.required]"
                  required
                ></v-text-field>
              </v-col>

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
                    v-model="owner.birthDate"
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
              <v-col cols="6">
                <v-text-field
                  class="required-field"
                  v-model="owner.firstName"
                  :label="$t('firstName')"
                  :rules="[firstNameRules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="owner.lastName"
                  :label="`${$t('lastName')} (${$t('optional')})`"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  class="required-field"
                  v-model.number="owner.phoneNumber"
                  :label="$t('phone')"
                  type="number"
                  :rules="[phoneRules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  class="required-field"
                  v-model.number="owner.countryCode"
                  :label="$t('countryCode')"
                  type="number"
                  :rules="[countryCodeRules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="owner.addressLine1"
                  :label="`${$t('address1')} (${$t('optional')})`"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="owner.addressLine2"
                  :label="`${$t('address2')} (${$t('optional')})`"
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
import moment from 'moment';

export default {
  name: 'OwnersDetailModal',

  data() {
    return {
      isValid: false,
      currentDate: moment().format('YYYY-MM-DD'),
      owner: {},
      date: '',
      calendarMenu: false,
      dialog: false,
      defaultOwner: {
        id: '-1',
        ownerId: '',
        phoneNumber: '',
        countryCode: '',
        birthDate: '',
        addressLine1: '',
        addressLine2: '',
        firstName: '',
        lastName: ''
      }
    };
  },

  computed: {
    formTitle() {
      const { id } = this.owner;
      return id === '-1' ? this.$t('newOwner') : this.$t('editOwner');
    },
    idRules() {
      return { required: value => !!value || this.$t('idIsRequired') };
    },
    firstNameRules() {
      return { required: value => !!value || this.$t('firstNameIsRequired') };
    },

    lastNameRules() {
      return { required: value => !!value || this.$t('lastNameIsRequired') };
    },

    phoneRules() {
      return { required: value => !!value || this.$t('phoneIsRequired') };
    },
    countryCodeRules() {
      return {
        required: value => !!value || this.$t('countryCodeIsRequired')
      };
    },

    dateRangeText() {
      return this.date;
    }
  },

  methods: {
    ...mapActions('owners', ['addOwner', 'updateOwner']),

    open(ownerToUpsert) {
      this.owner = Object.assign({}, ownerToUpsert || this.defaultOwner);
      this.dialog = true;
    },

    close() {
      this.resetValidations();
      this.isValid = false;
      this.owner = Object.assign({}, this.defaultOwner);
      this.dialog = false;
    },

    async save() {
      const { id } = this.owner;
      this.owner = Object.assign({}, this.owner);

      if (id !== '-1') {
        try {
          await this.updateOwner(this.owner);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: this.$t('ownerInfoWasUpdatedSuccessfully'),
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
                message: this.$t('errorWhileUpdatingOwnerInfoPleaseTryAgain'),
                messageType: 'error'
              }
            )
          );
        }
      } else {
        try {
          await this.addOwner(this.owner);
          this.$root.$emit(
            'open-status-message-snackbar',
            Object.assign(
              {},
              {
                message: `${this.$t('theOwner')} ${this.owner.firstName} ${
                  this.owner.lastName
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
                message: this.$t('errorWhileCreatingTheOwner'),
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
      this.$refs.ownerForm.resetValidation();
    },

    cleanDateField() {
      this.calendarMenu = false;
      this.date = '';
    }
  }
};
</script>
