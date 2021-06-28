import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'vue-plyr/dist/vue-plyr.css'
import ScrollLoader from 'vue-scroll-loader'

Vue.config.productionTip = false

Vue.use(ScrollLoader)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
