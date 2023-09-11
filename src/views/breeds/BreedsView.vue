<i18n src="./resources/locales.json"></i18n>

<template>
  <v-container>
    <h1 class="ml-3 primary--text">{{ $t('breeds') }}</h1>
    <v-row class="mt-4 ml-5 mb-n7 mr-1" style="flex-wrap: nowrap">
      <v-col align="right" class="mr-4">
        <v-btn color="primary" @click="addBreed">
          {{ $t('newBreed') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="allBreeds"
      :options.sync="options"
      :server-items-length="allBreeds.totalCount"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
        itemsPerPageText: $t('rowsPerPage')
      }"
      :items-per-page="10"
      class="elevation-1 ma-8"
      :loading="getIsBreedLoading"
      :loading-text="$t('loadingPleaseWait')"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" class="mr-2" @click="editBreed(item)">
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
        <p>{{ $t('noBreeds') }}</p>
      </template>
    </v-data-table>

    <BreedsDetailModal ref="breedDetail" />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BreedsDetailModal from '../../components/breeds/breed-detail-modal/BreedsDetailModal.vue';

export default {
  name: 'BreedsView',
  components: { BreedsDetailModal },
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
          this.retrieveAllBreeds();
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
          text: this.$t('species'),
          value: 'speciesName',
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
    ...mapGetters('breeds', ['allBreeds', 'getBreedListPaginationProps']),
    ...mapGetters('species', ['allSpecies']),
    ...mapGetters('loading', ['getIsBreedLoading'])
  },
  mounted() {
    this.retrieveAllBreeds();
  },
  methods: {
    ...mapActions('breeds', ['retrieveAllBreeds']),
    ...mapMutations('breeds', ['setBreed']),
    addBreed() {
      this.$refs.breedDetail.open();
    },
    editBreed(breedToUpdate) {
      this.$refs.breedDetail.open(Object.assign({}, breedToUpdate));
    },
    seeOrderDetail(order) {
      this.setOrder(order);
      this.$router.push('/orders');
    }
  }
};
</script>
