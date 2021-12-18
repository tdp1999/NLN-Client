import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import userModule from './modules/user.store.js';
import provinceModule from '../store/modules/province.store.js';
import destModule from '../store/modules/destination.store.js';

export default new Vuex.Store({
	modules: {
		user: userModule,
		province: provinceModule,
		destination: destModule,
	},
	state: {
		path: '',
	},
	mutations: {
		currentPath(state, data) {
			state.path = data;
		},
	},
	actions: {},
	getters: {
		showCurrentPath(state) {
			return state.path;
		},
	},
});
