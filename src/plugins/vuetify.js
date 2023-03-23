/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  
  locale: {
    locale: 'pt',
    fallback: 'pt',
    messages: { pt }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#b52234',
        'primary-darken-1': '#3700B3',
        secondary: '#f34156',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      }
    },
  },
})
