<template>
	<v-container>
		<v-card>
			<v-toolbar flat class="grey lighten-1 white--text">
				<v-toolbar-title v-text="showList ? 'User Management' : 'Add user'"></v-toolbar-title>
				<v-spacer></v-spacer>

				<v-btn icon>
					<v-icon
						class="white--text"
						@click="showList = !showList"
						v-text="showList ? 'mdi-plus' : 'mdi-folder'"
					></v-icon>
				</v-btn>
			</v-toolbar>

			<v-sheet v-if="!showList" class="pa-3">
				<p class="text-caption">Registering new user</p>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						v-model="username"
						:rules="usernameRules"
						placeholder="Username"
						label="Username"
						required
					></v-text-field>

					<v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>

					<v-text-field
						v-model="password"
						:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="passwordRules"
						:type="showPass ? 'text' : 'password'"
						name="input-10-1"
						label="Password"
						hint="At least 8 characters"
						counter
						@click:append="showPass = !showPass"
					></v-text-field>

					<v-slider
						min="0"
						max="100"
						label="Age"
						class="pa-0 pt-3"
						hide-details
						v-model="age"
						:thumb-size="24"
						thumb-label="always"
					></v-slider>

					<v-text-field
						v-model="address"
						placeholder="Address"
						:rules="addressRules"
						label="Address"
						required
					></v-text-field>

					<v-select v-model="select" :items="items" label="Role"></v-select>
				</v-form>
				<v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
					Validate
				</v-btn>
			</v-sheet>
			<v-list v-else two-line>
				<v-list-item v-for="user in userArray" :key="user._id">
					<v-list-item-avatar>
						<v-icon class="grey lighten-1" dark>
							mdi-folder
						</v-icon>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title v-text="user.username"></v-list-item-title>

						<v-list-item-subtitle v-text="user.role"></v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-action>
						<v-btn icon>
							<v-icon color="grey lighten-1" @click="delUser(user.username)"
								>mdi-close-box-outline</v-icon
							>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-list>
		</v-card>

		<v-snackbar v-model="snackbarFail">
			Action fail!

			<template v-slot:action="{ attrs }">
				<v-btn color="warning" text v-bind="attrs" @click="snackbarFail = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>

		<v-snackbar v-model="snackbarSuccess">
			Action success!

			<template v-slot:action="{ attrs }">
				<v-btn color="success" text v-bind="attrs" @click="snackbarSuccess = false">
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
			showList: true,
			valid: true,
			username: '',
			email: '',
			password: '',
			age: 0,
			address: '',
			select: { role: 'Author', perm: 'Just post' },
			items: ['Author', 'Administrator'],
			showPass: false,
			usernameRules: [
				(v) => !!v || 'Username is required',
				(v) =>
					(v && v.length >= 8 && v.length <= 15) ||
					'Username must be more than 8 characters and less than 16 characters',
				(v) => /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(v) || 'Username invalid :) ',
			],
			emailRules: [
				(v) => !!v || 'E-mail is required',
				(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			passwordRules: [(v) => !!v || 'Password required.', (v) => v.length >= 8 || 'Min 8 characters'],
			addressRules: [(v) => !!v || 'Address is required'],
			snackbarFail: false,
			snackbarSuccess: false,
		};
	},
	created() {
		this.fetchData();
	},
	computed: {
		userArray() {
			return this.$store.getters['user/showUserArray'];
		},
	},
	methods: {
		fetchData() {
			this.$store.dispatch('user/retrieveUserArray');
		},
		submit() {
			this.$store
				.dispatch('user/addNewUser', {
					username: this.username,
					email: this.email,
					password: this.password,
					age: this.age,
					address: this.address,
					role: this.select.toLowerCase(),
				})
				.then((value) => {
					if (value == true) {
						this.snackbarSuccess = true;
						this.$refs.form.reset();
						this.showList = 'true';
						this.fetchData();
						this.$forceUpdate();
					} else this.snackbarFail = true;
				});
		},
		delUser(username) {
			this.$store.dispatch('user/deleteUser', { username }).then((value) => {
				if (value == true) {
					this.snackbarSuccess = true;
					this.fetchData();
					this.$forceUpdate();
				} else this.snackbarFail = true;
			});
		},
	},
};
</script>

<style></style>
