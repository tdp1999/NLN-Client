export default {
	namespaced: true,
	state: {
		userInfo: {},
		userArray: [],
	},

	mutations: {
		changeUserInfo(state, data) {
			state.userInfo = data;
		},
		changeUserArray(state, data) {
			state.userArray = data;
		},
		logoutUser(state) {
			state.userInfo = {};
		},
	},
	actions: {
		async loginUser({ commit }, data) {
			const commitData = {
				email: data.email,
				password: data.password,
			};

			const response = await fetch('http://localhost:3000/user/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(commitData),
			});

			const responseData = await response.json();

			if (!response.ok) throw new Error(responseData.error);
			else {
				localStorage.setItem('token', responseData.token);
				localStorage.setItem('username', responseData.user.username);
				commit('changeUserInfo', {
					token: responseData.token,
					username: responseData.user.username,
				});
			}
		},
		async logoutUser(context) {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:3000/user/logout', {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
				});

				const responseData = await response.text();

				if (!response.ok) throw new Error(responseData.error);
				else {
					context.commit('logoutUser');
					localStorage.removeItem('token');
					localStorage.removeItem('username');
					return true;
				}
			} catch (err) {
				return false;
			}
		},
		async addNewUser(context, payload) {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:3000/user/register', {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		async getUserInfo({ commit }) {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:3000/user/me', {
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeUserInfo', responseData);
				}
			} catch (err) {
				return err;
			}
		},
		async updateInfo({ commit }, payload) {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:3000/user/update', {
					method: 'PATCH',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeUserInfo', responseData);
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		async retrieveUserArray({ commit }) {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:3000/user/list', {
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					commit('changeUserArray', responseData);
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		async deleteUser(context, payload) {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:3000/user/remove', {
					method: 'DELETE',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else {
					return response.ok;
				}
			} catch (err) {
				return err;
			}
		},
		async retrieveDestList() {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:3000/user/destList', {
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
				});
				const responseData = await response.json();

				if (!response.ok) throw new Error(responseData.error);
				else return responseData;
			} catch (err) {
				return err;
			}
		},
	},
	getters: {
		showUserInfo: (state) => {
			return state.userInfo;
		},
		showUserArray: (state) => {
			return state.userArray;
		},
		isAuthenticated: () => {
			return !!localStorage.getItem('token');
		},
		showUsername: () => {
			return localStorage.getItem('username');
		},
	},
};
