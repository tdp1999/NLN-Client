<template>
	<v-container>
		<v-card>
			<v-card-title>Edit User Profile</v-card-title>

			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						v-model="username"
						:rules="usernameRules"
						:placeholder="userInfo.username"
						label="Username"
					></v-text-field>

					<v-text-field
						v-model="userInfo.email"
						label="E-mail (Cannot update)"
						disabled
						hint="Cannot update this field!"
					></v-text-field>

					<v-text-field
						placeholder="password"
						append-icon="'mdi-eye-off'"
						type="password"
						label="Password (Cannot update)"
						hint="Cannot update this field!"
						disabled
					></v-text-field>

					<v-row>
						<v-col cols="6">
							<v-text-field
								disabled
								v-model="userInfo.age"
								label="Age (current)"
							></v-text-field>
						</v-col>
						<v-col cols="6" align="right">
							<v-card flat color="transparent">
								<v-card-subtitle class="pa-0 pb-3">Update Age</v-card-subtitle>
								<v-slider
									min="0"
									max="100"
									v-model="age"
									:thumb-size="24"
									thumb-label="always"
								></v-slider>
							</v-card>
						</v-col>
					</v-row>

					<v-text-field
						v-model="address"
						:placeholder="userInfo.address"
						:rules="addressRules"
						label="Address"
					></v-text-field>

					<v-text-field
						v-model="userInfo.role"
						label="Role (Cannot update)"
						disabled
						hint="Cannot update this field!"
					></v-text-field>
				</v-form>

				<v-card-actions>
					<v-btn large class="pink darken-2 white--text" :disabled="!valid" @click="updateProfile"
						>UPDATE PROFILE</v-btn
					>
				</v-card-actions>
			</v-card-text>
		</v-card>

		<v-snackbar v-model="snackbarFail">
			Cannot Update!

			<template v-slot:action="{ attrs }">
				<v-btn color="warning" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>

		<v-snackbar v-model="snackbarSuccess">
			Update success!

			<template v-slot:action="{ attrs }">
				<v-btn color="success" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			address: '',
			age: 0,
			valid: true,
			usernameRules: [
				(v) => !!v || 'Username is required',
				(v) =>
					(v && v.length >= 4 && v.length <= 15) ||
					'Username must be more than 4 characters and less than 15 characters',
			],
			addressRules: [(v) => !!v || 'Address is required'],
			snackbarFail: false,
			snackbarSuccess: false,
		};
	},
	created() {
		this.$store.dispatch('user/getUserInfo');
	},
	computed: {
		userInfo() {
			return this.$store.getters['user/showUserInfo'];
		},
	},
	methods: {
		updateProfile() {
			this.$store
				.dispatch('user/updateInfo', {
					username: this.username,
					address: this.address,
					age: this.age,
				})
				.then((value) => {
					if (value == true) this.snackbarSuccess = true;
					else this.snackbarFail = true;
				});
		},
	},
};
</script>

<style></style>
