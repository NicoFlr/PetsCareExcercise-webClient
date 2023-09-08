<template>
  <div class="text-center">
    <v-overlay :value="overlay" :opacity="opacity" z-index="210">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'LoadingMask',

  props: ['isLoading'],

  data() {
    return {
      overlay: false,
      opacity: 0.65
    };
  },

  watch: {
    isLoading: {
      handler: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.overlay = newVal;
        }
      },
      immediate: true
    }
  }
};
</script>
