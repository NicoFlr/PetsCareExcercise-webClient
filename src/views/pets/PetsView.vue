<i18n src="./resources/locales.json"></i18n>

<template>
  <v-container>
    <h1 class="ml-3 primary--text">{{ $t('pets') }}</h1>
    <v-row class="mt-4 ml-5 mb-n7 mr-1" style="flex-wrap: nowrap">
      <v-col align="right" class="mr-4">
        <v-btn color="primary" @click="addPet">
          {{ $t('newPet') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="allPets"
      :options.sync="options"
      :server-items-length="allPets.totalCount"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
        itemsPerPageText: $t('rowsPerPage')
      }"
      :items-per-page="10"
      class="elevation-1 ma-8"
      :loading="getIsPetLoading"
      :loading-text="$t('loadingPleaseWait')"
    >
      <template v-slot:[`item.seeCardex`]="{ item }">
        <v-icon small color="primary" class="mr-2" @click="seePetCardex(item)">
          mdi-clipboard-text-multiple
        </v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" class="mr-2" @click="editPet(item)">
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
        <p>{{ $t('noPets') }}</p>
      </template>
    </v-data-table>
    <PetModal ref="petDetail" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PetModal from '../../components/pets/pets-detail-modal/PetsDetailModal.vue';

export default {
  name: 'PetsView',

  components: { PetModal },

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
          this.retrieveAllPets();
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
          text: this.$t('breed'),
          value: 'breedName',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('dateOfBirth'),
          value: 'dateOfBirth',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('owner'),
          value: 'ownerName',
          align: 'center',
          sortable: true,
          class: 'primary--text'
        },
        {
          text: this.$t('seeCardex'),
          value: 'seeCardex',
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

    ...mapGetters('pets', ['allPets', 'getPetListPaginationProps']),
    ...mapGetters('species', ['allSpecies']),
    ...mapGetters('breeds', ['allBreeds']),
    ...mapGetters('loading', ['getIsPetLoading'])
  },

  mounted() {
    this.retrieveAllPets();
  },

  methods: {
    ...mapActions('pets', ['retrieveAllPets']),
    //...mapMutations('pets', ['setPet']),

    addPet() {
      this.$refs.petDetail.open();
    },

    editPet(petToUpdate) {
      this.$refs.petDetail.open(Object.assign({}, petToUpdate));
    },

    seePetCardex(petToSeeCardex){

      this.$router.push({
        name: 'PetCardexes',
        params: Object.assign({}, petToSeeCardex)
      });
    },

    show() {
      console.log(this.options);
      console.log(this.allPets);
    },

    seeOrderDetail(order) {
      this.setOrder(order);
      this.$router.push('/orders');
    }
  }
};
</script>
