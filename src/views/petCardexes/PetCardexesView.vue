<i18n src="./resources/locales.json"></i18n>

<template>
  <v-container>
    <h1 class="ml-3 primary--text">
      {{ $t('petCardexes') + ' ' + $t('of') + ' ' + this.pet.name }}
    </h1>
    <v-row class="mt-4 ml-5 mb-n7 mr-1" style="flex-wrap: nowrap">
      <v-col align="right" class="mr-4">
        <v-btn color="primary" @click="addPetCardex">
          {{ $t('newPetCardex') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="allPetCardexes"
      :options.sync="options"
      :server-items-length="allPetCardexes.totalCount"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
        itemsPerPageText: $t('rowsPerPage')
      }"
      :items-per-page="10"
      class="elevation-1 ma-8"
      :loading="getIsPetCardexLoading"
      :loading-text="$t('loadingPleaseWait')"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" class="mr-2" @click="editPetCardex(item)">
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
        <p>{{ $t('noPetCardexes') }}</p>
      </template>
    </v-data-table>

    <PetCardexesModal ref="petCardexDetail" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PetCardexesModal from '../../components/petCardexes/petCardexes-detail-modal/PetCardexesDetailModal.vue';

export default {
  name: 'PetCardexesView',

  components: { PetCardexesModal },

  data() {
    return {
      isDisabled: true,
      options: {},
      pet: {}
    };
  },

  watch: {
    options: {
      handler: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.retrieveAllPetCardexesOfPet(this.pet.id);
        }
      },
      deep: true
    }
  },

  computed: {
    headers() {
      return [
        {
          text: this.$t('visitDate'),
          value: 'visitDate',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('description'),
          value: 'description',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('medication'),
          value: 'medication',
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

    ...mapGetters('petCardexes', [
      'allPetCardexes',
      'getPetCardexListPaginationProps'
    ]),
    ...mapGetters('species', ['allSpecies']),
    ...mapGetters('breeds', ['allBreeds']),
    ...mapGetters('loading', ['getIsPetCardexLoading'])
  },

  mounted() {
    this.retrieveAllPetCardexesOfPet(this.pet.id);
  },

  created() {
    this.pet = this.$route.params;
  },

  methods: {
    ...mapActions('petCardexes', [
      'retrieveAllPetCardexes',
      'retrieveAllPetCardexesOfPet'
    ]),

    addPetCardex() {
      this.$refs.petCardexDetail.open();
    },

    editPetCardex(petCardexToUpdate) {
      this.$refs.petCardexDetail.open(Object.assign({}, petCardexToUpdate));
    },

    show() {
      console.log(this.options);
      console.log(this.allPetCardexes);
    }
  }
};
</script>
