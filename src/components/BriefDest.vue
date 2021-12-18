<template>
	<v-container class="my-16">
		<v-row class="justify-center">
			<v-col cols="12" align="center">
				<h2 class="text-sm-h4 text-h6 text--primary font-weight-medium">
					Danh sách địa điểm du lịch nổi tiếng
				</h2>
			</v-col>
		</v-row>
		<v-row class="justify-center mb-8">
			<v-col cols="0" sm="4" v-for="(item, index) in destination.slice(0, 6)" :key="item.code">
				<v-card class="mx-auto" max-width="500" max-height="400">
					<v-img class="align-end" :src="image[index]" height="200px"> </v-img>

					<v-card-title class="text-capitalize" elevation="2">{{ item.name }}</v-card-title>

					<v-card-subtitle class="pb-1 text-capitalize">
						{{ item.province.name }}
					</v-card-subtitle>

					<v-card-text class="text--primary text-capitalize">
						{{ item.address.slice(0, 40) + '...' }}
					</v-card-text>

					<v-card-actions>
						<v-btn color="orange" text link :to="{ path: '/destination/' + item.code }">
							Xem chi tiết
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<v-row class="justify-center">
			<v-col cols="12" align="center">
				<v-btn large><router-link to="/destination">XEM THÊM</router-link></v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			destination: [],
			image: [],
		};
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.$store.dispatch('destination/retrieveDestArray').then((value) => {
				this.destination = value;
				for (const value of this.destination) {
					if (value.avatar == undefined) continue;
					const arrayBufferView = new Uint8Array(value.avatar.data);
					const file = new File([arrayBufferView], { type: 'image/jpeg' });
					this.readImage(file);
				}
			});
		},
		readImage(imageFile) {
			let reader = new FileReader();
			reader.addEventListener('load', () => {
				this.image.push(reader.result);
			});
			reader.readAsDataURL(imageFile);
		},
	},
};
</script>

<style></style>
