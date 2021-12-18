<template>
	<v-container fluid class="my-16 py-16 teal lighten-5">
		<v-row class="justify-center mt-16 mb-5">
			<h2 class="text-sm-h4 text-h5 text--primary font-weight-medium ">Tìm kiếm địa điểm du lịch</h2>
		</v-row>
		<v-row class="justify-center align-center">
			<v-col cols="8" sm="8">
				<v-form @submit.prevent="submit">
					<v-text-field
						label="Tìm kiếm địa điểm"
						autofocus
						prepend-inner-icon="mdi-magnify"
						hide-details="auto"
						rounded
						outlined
						clearable
						placeholder="Địa danh, tỉnh, ..."
						v-model="searchText"
					>
					</v-text-field>
				</v-form>
			</v-col>
			<v-col cols="0" sm="1" align="center">
				<v-btn rounded large class="primary" @click="submit">Submit</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			searchText: '',
		};
	},
	methods: {
		submit() {
			console.log('Small:', this.searchText);
			this.$router.push({ name: 'Search', params: { searchTextProps: this.searchText } });
		},
	},
};
</script>

<style scoped></style>
