<template>
	<nav>
		<v-app-bar flat dense app>
			<v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
			<v-btn icon @click.stop="mini = !mini" class="hidden-sm-and-down">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>

			<v-toolbar-title class="text-capitalize">{{ path }}</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-menu offset-y open-on-hover>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-account</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item>
						<v-list-item-title>
							<v-btn @click="logout">Logout</v-btn>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>

		<v-snackbar v-model="snackbar">
			Cannot logout!

			<template v-slot:action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<AdminSidebar :mini="mini" :drawer="drawer" />
	</nav>
</template>

<script>
import AdminSidebar from '../components/AdminSidebar.vue';
export default {
	components: {
		AdminSidebar,
	},
	data() {
		return {
			drawer: true,
			mini: false,
			snackbar: false,
		};
	},
	computed: {
		path() {
			const currentPath = this.$store.getters['showCurrentPath'];
			const lastIndexOfS = currentPath.lastIndexOf('/');
			return currentPath.slice(lastIndexOfS + 1);
		},
	},
	methods: {
		logout() {
			try {
				this.$store.dispatch('user/logoutUser').then((value) => {
					if (value == true) {
						this.$router.push('/');
						this.$router.go();
					} else this.snackbar = true;
				});
			} catch (e) {
				console.log('Hello', e);
			}
		},
	},
};
</script>

<style></style>
