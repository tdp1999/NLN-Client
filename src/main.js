import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import 'tiptap-vuetify/dist/main.css';
import 'vuetify/dist/vuetify.min.css';
Vue.use(TiptapVuetifyPlugin, { vuetify, iconsGroup: 'mdi' });

import './scss/main.scss';

import Normal from './layout/NormalPage.vue';
import Admin from './layout/AdminPage.vue';

Vue.component('normal-layout', Normal);
Vue.component('admin-layout', Admin);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
