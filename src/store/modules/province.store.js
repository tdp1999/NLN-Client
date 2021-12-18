export default {
	namespaced: true,
	state: {
		provInfo: {},
		provArray: [],
		provDestArray: [],
	},
	mutations: {
		changeProvInfo(state, data) {
			state.provInfo = data;
		},
		changeProvArray(state, data) {
			state.provArray = data;
		},
		changeProvDestArray(state, data) {
			state.provDestArray = data;
		},
	},
	actions: {
		async retrieveProvArray({ commit }) {
			try {
				const response = await fetch('http://localhost:3000/province/', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeProvArray', responseData);
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		async retrieveProvInfo({ commit }, payload) {
			try {
				const response = await fetch('http://localhost:3000/province/' + payload, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeProvInfo', responseData);
					return responseData;
				}
			} catch (err) {
				return err;
			}
		},
		async retrieveProvDest({ commit }, payload) {
			try {
				const response = await fetch('http://localhost:3000/province/list/' + payload, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeProvInfo', responseData);
					return responseData;
				}
			} catch (err) {
				return err;
			}
		},
		async updateProv({ commit }, payload) {
			const token = localStorage.getItem('token');
			try {
				const response = await fetch('http://localhost:3000/province/update/', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					body: JSON.stringify(payload),
				});

				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeProvInfo', responseData);
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
	},
	getters: {
		showProvInfo: (state) => {
			return state.provInfo;
		},
		showProvArray: (state) => {
			return state.provArray;
		},
		showProvDestArray: (state) => {
			return state.provDestArray;
		},
	},
};
