import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import JsonExcel from 'vue-json-excel'

Vue.use(VueRouter)
Vue.use(Toast)
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false

new Vue({
	render: (h) => h(App),
	router,
}).$mount('#app')
