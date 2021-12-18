<template>
	<v-container>
		<v-row align="center" justify="center" class="py-4">
			<h2 class="text-h3">YOUR DESTINATION</h2>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-row v-for="item in list" :key="item._id">
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
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			list: [],
		};
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.$store.dispatch('user/retrieveDestList').then((value) => (this.list = value));
		},
	},
};
</script>

<style></style>
