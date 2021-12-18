<template>
	<v-navigation-drawer :mini-variant.sync="mini" :permanent="drawer" app>
		<v-list-item>
			<v-list-item-content class="title">
				<span class="font-weight-thin"
					><router-link to="/" class="no-line">Thunderphong</router-link></span
				>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list nav>
			<v-list-item-group>
				<v-list-item v-for="item in items" :key="item.title" :to="item.path" exact link>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	props: ['mini', 'drawer'],
	data() {
		return {
			items: [
				{ title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/dashboard' },
				{ title: 'User Info', icon: 'mdi-account', path: '/dashboard/userInfo' },
				{
					title: 'User Management',
					icon: 'mdi-account-supervisor-circle',
					path: '/dashboard/userManagement',
				},
				{ title: 'Destination Info', icon: 'mdi-map-marker', path: '/dashboard/destination' },
				{ title: 'Province Info', icon: 'mdi-folder-information', path: '/dashboard/province' },
			],
		};
	},
};
</script>

<style scoped>
.no-line {
	text-decoration: none;
	color: black;
	font-weight: 300;
}
</style>
