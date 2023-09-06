import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const vuetify = {
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: colors.red.darken4,
        primaryVariant1: colors.shades.black,
        primaryVariant2: colors.shades.white,
        secondary: colors.grey.darken2,
        accent: colors.red.accent1,
        surface: colors.shades.white,
        error: colors.red.accent2,
        info: colors.blue,
        success: colors.green,
        warning: colors.amber,
        backgroundColor: colors.grey.lighten4,
        redLighten: '#FF9D9D'
      },
      dark: {
        primary: colors.red.darken4,
        primaryVariant1: colors.shades.black,
        primaryVariant2: colors.shades.white,
        secondary: colors.grey.darken2,
        accent: colors.red.accent1,
        surface: colors.shades.black,
        error: colors.red.accent2,
        info: colors.blue,
        success: colors.green,
        warning: colors.amber,
        backgroundColor: colors.grey.darken3,
        redLighten: '#FF9D9D'
      }
    }
  }
};

export default new Vuetify(vuetify);
