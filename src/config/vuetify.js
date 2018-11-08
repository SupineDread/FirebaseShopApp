import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken1,
    secondary: colors.indigo.lighten4,
    accent: colors.amber.base,
    error: colors.red.accent3
  }
})
