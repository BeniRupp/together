import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import store, { State } from './store'

const app = createApp(App)

app.use(createStore<State>(store))

app.mount('#app')
