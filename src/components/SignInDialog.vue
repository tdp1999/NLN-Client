<template>
	<v-dialog v-model="dialog" max-width="500px">
		<template v-slot:activator="{ on, attrs }">
			<v-btn text rounded class="px-5 primary" v-bind="attrs" v-on="on">
				<span>Sign in</span>
				<v-icon right> mdi-login-variant </v-icon>
			</v-btn>
		</template>

		<v-card elevation="2">
			<v-card-title>Sign In</v-card-title>

			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

					<v-text-field
						v-model="password"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="[passwordRules.required]"
						:type="show1 ? 'text' : 'password'"
						name="input-10-1"
						label="Password"
						@click:append="show1 = !show1"
					></v-text-field>
				</v-form>
			</v-card-text>

			<v-card-actions>
				<v-row class="pa-0 ma-0" justify="center">
					<v-btn :disabled="!valid" large color="primary" class="mr-4" @click="submit">
						Sign In
					</v-btn>
				</v-row>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			valid: true,
			email: '',
			emailRules: [
				(v) => !!v || 'E-mail is required',
				(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			show1: false,
			password: '',
			passwordRules: {
				required: (v) => !!v || 'Password required.',
				min: (v) => v.length >= 8 || 'Min 8 characters',
			},
		};
	},
	methods: {
		async submit() {
			try {
				const loginData = { email: this.email, password: this.password };
				await this.$store.dispatch('user/loginUser', loginData);

				this.$refs.form.reset();
				this.$router.push('/dashboard');
				this.$router.go();
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>

<style></style>
