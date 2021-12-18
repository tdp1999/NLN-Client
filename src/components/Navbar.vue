<template>
	<nav>
		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list-item>
				<v-list-item-content class="title">
					<span class="font-weight-thin">Thunder</span>
					<span>Phong</span>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list nav dense>
				<v-list-item-group color="primary">
					<v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" link>
						<v-list-item-icon>
							<v-icon>{{ item.icon }} </v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title v-text="item.title"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app>
			<span class="hidden-md-and-up">
				<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
			</span>

			<v-app-bar-title class="text-uppercase" title>
				<span class="font-weight-thin">Thunder</span>
				<span>Phong</span>
			</v-app-bar-title>

			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn v-for="item in menuItems" :key="item.title" :to="item.path" text class="mx-3">
					{{ item.title }}
				</v-btn>
			</v-toolbar-items>

			<v-spacer></v-spacer>

			<template v-if="!isLoggedIn">
				<SignInDialog />
			</template>

			<template v-else>
				<v-btn text rounded class="px-5 primary" link to="/dashboard">
					<span>Go to dashboard</span>
					<v-icon right> mdi-login-variant </v-icon>
				</v-btn>
			</template>
		</v-app-bar>
	</nav>
</template>

<script>
import SignInDialog from '../components/SignInDialog.vue';
export default {
	components: {
		SignInDialog,
	},
	data() {
		return {
			appTitle: 'ThunderPhong',
			drawer: false,
			menuItems: [
				{ title: 'Trang chủ', path: '/', icon: 'mdi-view-dashboard' },
				{ title: 'Giới thiệu', path: '/introduction', icon: 'mdi-podium-gold' },
				{ title: 'Địa điểm', path: '/destination', icon: 'mdi-map-marker' },
				{ title: 'Tìm kiếm', path: '/search', icon: 'mdi-briefcase-search' },
				{ title: 'Liên hệ', path: '/contact', icon: 'mdi-card-account-mail' },
			],
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters['user/isAuthenticated'];
		},
		username() {
			return this.$store.getters['user/showUsername'];
		},
	},
};
</script>
