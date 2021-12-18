<template>
	<v-container>
		<v-card>
			<v-card-title>
				Destination

				<v-spacer></v-spacer>
				<v-text-field
					class="ma-0 pa-0"
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>

				<v-divider class="mx-2 " vertical></v-divider>

				<v-btn>
					<router-link :to="{ name: 'Add destination', params: { blank: true } }">
						Add Destination
					</router-link>
				</v-btn>
			</v-card-title>

			<v-data-table :headers="headers" :items="destination" :search="search" calculate-widths>
				<template v-slot:top>
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="headline"
								>Are you sure you want to delete this item?</v-card-title
							>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeDelete()">Cancel</v-btn>
								<v-btn color="blue darken-1" text @click="confirmDelete()">OK</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</template>
				<template v-slot:item.action="{ item }">
					<v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil
					</v-icon>
					<v-icon small @click="deleteItem(item)">
						mdi-delete
					</v-icon>
				</template>
			</v-data-table>
		</v-card>

		<Snackbar :fail="snackbarFail" :success="snackbarSuccess" />
	</v-container>
</template>

<script>
import Snackbar from '../components/Snackbar.vue';
export default {
	components: { Snackbar },
	data() {
		return {
			search: '',
			dialogDelete: false,
			headers: [
				{
					text: 'Travel destination',
					align: 'start',
					value: 'name',
					width: '1%',
				},
				{ text: 'Location', value: 'address', width: '1%' },
				{ text: 'Province', value: 'province', width: '1%' },
				{ text: 'Price Range', value: 'priceRange', width: '1%' },
				{ text: 'Introduction', value: 'introPara', width: '1%' },
				{ text: 'Author', value: 'author', width: '1%' },
				{ text: 'Action', value: 'action', width: '1%' },
			],
			selectItem: {},
			snackbarFail: false,
			snackbarSuccess: false,
		};
	},
	mounted() {
		this.fetchData();
	},
	computed: {
		destination() {
			return this.$store.getters['destination/showDestArray'];
		},
	},
	methods: {
		fetchData() {
			this.$store.dispatch('destination/retrieveDestArray');
		},

		// Action
		deleteItem(value) {
			this.selectItem = value;
			this.dialogDelete = true;
		},
		closeDelete() {
			this.dialogDelete = false;
		},
		confirmDelete() {
			this.$store.dispatch('destination/deleteDest', this.selectItem).then((value) => {
				if (value) {
					this.snackbarSuccess = true;
					this.fetchData();
				} else this.snackbarFail = true;
				this.dialogDelete = false;
			});
		},
		editItem(value) {
			this.$router.push({ path: '/dashboard/destination/' + value.code });
		},
		add() {
			this.$router.push({ path: '/dashboard/destination/add', params: { blank: true } });
		},
	},
};
</script>

<style scoped></style>
