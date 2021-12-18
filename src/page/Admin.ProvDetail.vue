<template>
	<v-container>
		<h2 class="text-capitalize">Update Province</h2>
		<v-text-field :loading="loading" disabled outlined :value="province" hide-details></v-text-field>
		<v-row justify="center" align="center">
			<v-col cols="12" md="8">
				<v-card flat>
					<v-card-title>Introduction Para</v-card-title>
					<v-card-text class="pa-0">
						<v-textarea v-model="introPara" outlined hide-details> </v-textarea>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="4" class="py-0">
				<v-card flat>
					<v-card-title>Information</v-card-title>
					<v-row class="align-center mx-1 mb-1">
						<span> <v-icon left>mdi-folder</v-icon> _id: {{ provInfo._id }}</span>
					</v-row>
					<v-row class="align-center mx-1 mb-1">
						<span> <v-icon left>mdi-folder</v-icon> Code: {{ provInfo.code }}</span>
					</v-row>
					<v-row class="align-center mx-1 mb-1">
						<span> <v-icon left>mdi-folder</v-icon> Name: {{ provInfo.name }}</span>
					</v-row>
					<v-row justify="center" class="pt-2 pb-2">
						<v-btn class="primary" large text @click="submit">submit change</v-btn>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-row class="ma-2">
					<h2 class="text-h2">Destination list</h2>
				</v-row>
				<v-row v-for="item in provArray" :key="item._id">
					<v-card outlined class="ma-2">
						<v-card-title class="text-capitalize">{{ item.name }}</v-card-title>
						<v-card-subtitle> {{ item.address }} </v-card-subtitle>
						<v-card-text> {{ item.content.slice(0, 200) + '...' }} </v-card-text>
						<v-card-actions>
							<v-btn text>
								<router-link :to="{ path: '/dashboard/destination/' + item.code }"
									>Go to destination</router-link
								>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-row>
			</v-col>
		</v-row>

		<Snackbar :fail="snackbarFail" :success="snackbarSuccess" />
	</v-container>
</template>

<script>
import Snackbar from '../components/Snackbar.vue';
export default {
	components: { Snackbar },
	data() {
		return {
			provInfo: {},
			provArray: [],
			loading: true,
			province: '',
			introPara: '',
			snackbarFail: false,
			snackbarSuccess: false,
		};
	},
	mounted() {
		this.fetchData();
		this.fetchArray();
		this.loading = false;
	},
	methods: {
		fetchData() {
			this.$store.dispatch('province/retrieveProvInfo', this.$route.params.prov).then((value) => {
				this.province = value.name;
				this.provInfo = value;
				this.introPara = value.introPara;
			});
		},
		fetchArray() {
			this.$store
				.dispatch('province/retrieveProvDest', this.$route.params.prov)
				.then((value) => (this.provArray = value));
		},
		submit() {
			this.$store
				.dispatch('province/updateProv', {
					code: this.$route.params.prov,
					introPara: this.introPara,
				})
				.then((value) => {
					if (value) this.snackbarSuccess = true;
					else this.snackbarFail = true;
				});
		},
	},
};
</script>

<style></style>
