<i18n src="./resources/locales.json"></i18n>

<template>
  <v-container>
    <h1 class="ml-3 primary--text">{{ $t('species') }}</h1>
    <v-row class="mt-4 ml-5 mb-n7 mr-1" style="flex-wrap: nowrap">
      <v-col align="right" class="mr-4">
        <v-btn color="primary" @click="addSpecies">
          {{ $t('newSpecies') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="allSpecies"
      :options.sync="options"
      :server-items-length="allSpecies.totalCount"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
        itemsPerPageText: $t('rowsPerPage')
      }"
      :items-per-page="10"
      class="elevation-1 ma-8"
      :loading="getIsSpeciesLoading"
      :loading-text="$t('loadingPleaseWait')"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" class="mr-2" @click="editSpecies(item)">
          mdi-pencil-outline
        </v-icon>
        <!--v-icon small color="primary" @click="deleteSpecies(item)">
            mdi-delete
          </v-icon-->
      </template>
      <template v-slot:[`footer.page-text`]="items">
        {{ items.pageStart }} - {{ items.pageStop }} {{ $t('of') }}
        {{ items.itemsLength }}
      </template>
      <template v-slot:no-data>
        <p>{{ $t('noSpecies') }}</p>
      </template>
    </v-data-table>

    <SpeciesDetailModal ref="speciesDetail" />
    <!--DeleteConfirmModal
      ref="deleteClientModal"
      @confirm-action="deleteClientConfirm"
    /-->
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SpeciesDetailModal from '../../components/species/species-detail-modal/SpeciesDetailModal.vue';

export default {
  name: 'SpeciesView',

  components: { SpeciesDetailModal },

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
          this.retrieveAllSpecies();
        }
      },
      deep: true
    }
  },

  computed: {
    headers() {
      return [
        {
          text: this.$t('name'),
          value: 'name',
          align: 'center',
          sortable: true,
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

    ...mapGetters('species', ['allSpecies', 'getSpeciesListPaginationProps']),
    ...mapGetters('loading', ['getIsSpeciesLoading'])
  },

  mounted() {
    this.retrieveAllSpecies();
  },

  methods: {
    ...mapActions('species', ['retrieveAllSpecies']),
    ...mapMutations('species', ['setSpecies']),

    addSpecies() {
      this.$refs.speciesDetail.open();
    },

    editSpecies(speciesToUpdate) {
      this.$refs.speciesDetail.open(Object.assign({}, speciesToUpdate));
    },

    show() {
      console.log(this.options);
      console.log(this.allSpecies);
    },

    seeOrderDetail(order) {
      this.setOrder(order);
      this.$router.push('/orders');
    }
  }
};
</script>
