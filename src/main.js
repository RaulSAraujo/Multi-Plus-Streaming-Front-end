/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { inject } from "@vercel/analytics"

const app = createApp(App)

registerPlugins(inject)
registerPlugins(app)

app.mount('#app')
