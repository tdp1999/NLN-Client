<template>
	<v-container fluid class="mt-16 py-16 teal lighten-5">
		<template v-if="!isLoggedIn">
			<v-row class="justify-center mb-8">
				<h2 class="text-sm-h4 text-h5 text--primary font-weight-medium" align="center">
					Thêm địa điểm của riêng mình? Đăng nhập ngay!
				</h2>
			</v-row>

			<v-row class="justify-center align-center">
				<!-- <v-btn text rounded class="px-16 primary large">
					<router-link>
						<span>Sign in</span>
						<v-icon right> mdi-login-variant </v-icon>
					</router-link>
				</v-btn> -->
				<SignInDialog />
			</v-row>
		</template>
		<v-container v-else>
			<v-row class="justify-center mb-8">
				<h2 class="text-sm-h4 text-h5 text--primary font-weight-medium" align="center">
					ĐI ĐẾN BẢNG TIN
				</h2>
			</v-row>
			<v-row class="justify-center align-center">
				<v-btn text rounded class="px-5 primary" link to="/dashboard">
					<span>Go to dashboard</span>
					<v-icon right> mdi-login-variant </v-icon>
				</v-btn>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
import SignInDialog from '../components/SignInDialog.vue';
export default {
	components: {
		SignInDialog,
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters['user/isAuthenticated'];
		},
	},
};
</script>

<style></style>
