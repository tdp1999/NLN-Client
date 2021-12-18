export default {
	namespaced: true,
	state: {
		destInfo: {},
		destArray: [],
	},
	mutations: {
		changeDestInfo(state, data) {
			state.destInfo = data;
		},
		changeDestArray(state, data) {
			state.destArray = data;
		},
	},
	getters: {
		showDestInfo: (state) => {
			return state.destInfo;
		},
		showDestArray: (state) => {
			const raw = state.destArray;
			const compact = [];
			let formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
			for (const item of raw) {
				const ob = {};
				ob.name = item.name;
				ob.code = item.code;
				ob.address = item.address;
				ob.province = item.province.name;
				ob.priceRange =
					formatter.format(item.priceRange.minPrice) +
					' - ' +
					formatter.format(item.priceRange.maxPrice);
				ob.introPara = item.introPara.slice(0, 200) + '...';
				ob.avatar = item.avatar;
				ob.author = item.author.username;
				compact.push(ob);
			}
			return compact;
		},
	},
	actions: {
		async retrieveDestArray({ commit }) {
			try {
				const response = await fetch('http://localhost:3000/destination/list', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();
				if (!response.ok) throw new Error(responseData.error);
				else {
					console.log(responseData);
					commit('changeDestArray', responseData);
					return responseData;
				}
			} catch (err) {
				return err;
			}
		},
		async retrieveDestInfo({ commit }, payload) {
			try {
				const response = await fetch('http://localhost:3000/destination/retrieve/' + payload, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeDestInfo', responseData);
					return responseData;
				}
			} catch (err) {
				return err;
			}
		},
		async updateContentDest({ commit }, payload) {
			const token = localStorage.getItem('token');
			const dest = payload.dest;
			delete payload.dest;

			try {
				const response = await fetch('http://localhost:3000/destination/update/' + dest, {
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
					commit('changeDestInfo', responseData);
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		async addDest({ commit }, payload) {
			const token = localStorage.getItem('token');
			try {
				const response = await fetch('http://localhost:3000/destination/add/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					body: JSON.stringify(payload),
				});

				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeDestInfo', responseData);
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		async deleteDest({ commit }, payload) {
			const token = localStorage.getItem('token');
			try {
				const response = await fetch('http://localhost:3000/destination/delete/', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					body: JSON.stringify(payload),
				});

				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeDestInfo', {});
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		// async uploadImage({commit}, payload){

		// }
	},
};
