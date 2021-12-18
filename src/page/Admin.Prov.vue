<template>
	<v-container>
		<h2>All ({{ provArray.length }})</h2>
		<v-divider></v-divider>

		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">
							Province
						</th>
						<th class="text-left">
							Code
						</th>
						<th class="text-left">
							Introduction
						</th>
						<th class="text-left">
							Destination within
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="prov in provArray"
						:key="prov._id"
						@click="clickRow(prov.code)"
						class="clickable"
					>
						<td class="text-capitalize">{{ prov.name }}</td>
						<td>{{ prov.code }}</td>
						<td>{{ prov.introPara.slice(0, 80) + '...' }}</td>
						<td>{{ prov.destination.length }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</v-container>
</template>

<script>
export default {
	created() {
		this.fetchData();
	},
	computed: {
		provArray() {
			return this.$store.getters['province/showProvArray'];
		},
	},
	methods: {
		fetchData() {
			this.$store.dispatch('province/retrieveProvArray');
		},
		clickRow(provCode) {
			this.$router.push({ path: '/dashboard/province/' + provCode });
		},
	},
};
</script>

<style scoped>
.clickable {
	cursor: pointer;
}
</style>
