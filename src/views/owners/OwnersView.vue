<i18n src="./resources/locales.json"></i18n>

<template>
  <v-container>
    <h1 class="ml-3 primary--text">{{ $t('owners') }}</h1>
    <v-row class="mt-4 ml-5 mb-n7 mr-1" style="flex-wrap: nowrap">
      <v-col align="right" class="mr-4">
        <v-btn color="primary" @click="addOwner">
          {{ $t('newOwner') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="allOwners"
      :options.sync="options"
      :server-items-length="allOwners.totalCount"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
        itemsPerPageText: $t('rowsPerPage')
      }"
      :items-per-page="10"
      class="elevation-1 ma-8"
      :loading="getIsOwnerLoading"
      :loading-text="$t('loadingPleaseWait')"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" class="mr-2" @click="editOwner(item)">
          mdi-pencil-outline
        </v-icon>
        <!--v-icon small color="primary" @click="deleteClient(item)">
          mdi-delete
        </v-icon-->
      </template>
      <template v-slot:[`footer.page-text`]="items">
        {{ items.pageStart }} - {{ items.pageStop }} {{ $t('of') }}
        {{ items.itemsLength }}
      </template>
      <template v-slot:no-data>
        <p>{{ $t('noOwners') }}</p>
      </template>
    </v-data-table>

    <OwnersDetailModal ref="ownerDetail" />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import OwnersDetailModal from '../../components/owners/owners-detail-modal/OwnersDetailModal.vue';

export default {
  name: 'OwnersView',

  components: { OwnersDetailModal },

  data() {
    return {
      isDisabled: true,
      options: {}
    };
  },

  watch: {
    options: {
      handler: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.retrieveAllOwners();
        }
      },
      deep: true
    }
  },

  computed: {
    headers() {
      return [
        {
          text: this.$t('ownerId'),
          value: 'ownerId',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('fullName'),
          value: 'fullName',
          align: 'center',
          sortable: false,
          class: 'primary--text'
        },
        {
          text: this.$t('countryCode'),
          value: 'countryCode',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('phoneNumber'),
          value: 'phoneNumber',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('birthDate'),
          value: 'birthDate',
          align: 'center',
          sortable: false,
          class: 'primary--text'
        },
        {
          text: this.$t('addressLine1'),
          value: 'addressLine1',
          align: 'center',
          sortable: false,
          class: 'primary--text'
        },
        {
          text: this.$t('addressLine2'),
          value: 'addressLine2',
          align: 'center',
          sortable: false,
          class: 'primary--text'
        },
        {
          text: this.$t('actions'),
          value: 'actions',
          align: 'center',
          sortable: false,
          class: 'primary--text'
        }
      ];
    },

    ...mapGetters('owners', ['allOwners', 'getOwnerListPaginationProps']),
    ...mapGetters('loading', ['getIsOwnerLoading'])
  },

  mounted() {
    this.retrieveAllOwners();
  },

  methods: {
    ...mapActions('owners', ['retrieveAllOwners']),
    ...mapMutations('owners', ['setOwner']),

    addOwner() {
      this.$refs.ownerDetail.open();
    },
    editOwner(ownerToUpdate) {
      this.$refs.ownerDetail.open(Object.assign({}, ownerToUpdate));
    }
  }
};
</script>
