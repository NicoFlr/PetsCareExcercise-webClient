<i18n src="./resources/locales.json"></i18n>

<template>
    <v-container>
      <h1 class="ml-3 primary--text">{{ $t('pets') }}</h1>
      <v-row>
            <v-col class="flex-grow-0 flex-shrink-0">
        <v-btn color="primary" @click="show">
          {{ $t('newPet') }}
        </v-btn>
      </v-col>
    </v-row>
      <v-data-table
        :headers="headers"
        :items="allPets"
        :options.sync="options"
        :server-items-length="getPetListPaginationProps.totalCount"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 20],
          itemsPerPageText: $t('rowsPerPage'),
        }"
        :items-per-page="10"
        class="elevation-1 ma-8"
        :loading="getIsPetLoading"
        :loading-text="$t('loadingPleaseWait')"
      >
      <template v-slot:[`item.actions`]="{ item }" >
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

    </v-container>
  </template>
  
  <script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  
  export default {
    name: 'PetsView',
  
    data() {
      return {
        isDisabled: true,
        options: {},
      };
    },
  
    watch: {
      options: {
        handler: function (newVal, oldVal) {
          if (newVal !== oldVal) {
            this.options.page = this.options.page-1;
            this.retrieveAllPets(this.options);
          }
        },
        deep: true,
      },
    },
  
    computed: {
      headers() {
        return [
          {
            text: this.$t('name'),
            value: 'name',
            align: 'center',
            sortable: true,
            class: 'primary--text',
          },
          {
            text: this.$t('species'),
            value: 'species',
            align: 'center',
            sortable: true,
            class: 'primary--text',
          },
          {
            text: this.$t('breed'),
            value: this.allBreeds,
            align: 'center',
            sortable: true,
            class: 'primary--text',
          },
          {
            text: this.$t('dateOfBirth'),
            value: 'dateOfBirth',
            align: 'center',
            sortable: true,
            class: 'primary--text',
          },
          {
            text: this.$t('actions'),
            value: 'actions',
            align: 'center',
            sortable: false,
            class: 'primary--text',
          },
        ];
      },
  
      ...mapGetters('pets', ['allPets', 'getPetListPaginationProps']),
      ...mapGetters('species',['allSpecies']),
      ...mapGetters('breeds',['allBreeds']),
      ...mapGetters('loading', ['getIsPetLoading']) 
    },

    mounted() {
      this.options.page = this.options.page-1;
    this.retrieveAllPets(this.options);
  },
  
    methods: {
      ...mapActions('pets', ['retrieveAllPets']),
      ...mapMutations('pets', ['setPet']),
  
      addPet() {
      this.$refs.petDetail.open();
    },

    show(){
      console.log(this.options);
        console.log(this.allPets);
    },

      seeOrderDetail(order) {
        this.setOrder(order);
        this.$router.push('/orders');
      },
    },
  };
  </script>
  