<template>
	<v-container fluid class="pa-0">
		<ImageHeadPost :src="src" headline="ĐỊA ĐIỂM" />

		<v-container class="mt-16">
			<h2 class="text-h4 font-weight-medium">DANH SÁCH CÁC ĐỊA ĐIỂM HIỆN CÓ</h2>

			<v-card
				v-for="(item, index) in destinationMod"
				:key="item.code"
				class="my-8 pa-2"
				outlined
				shaped
				elevation="5"
			>
				<div class="d-flex flex-no-wrap justify-space-between align-center">
					<div>
						<v-card-title class="text-capitalize ">
							<h3 class="text-h6 font-weight-medium">{{ item.name }}</h3>
						</v-card-title>

						<v-card-subtitle class="text-capitalize text-subtitle-2">
							{{ item.address }}
						</v-card-subtitle>

						<v-card-text> {{ item.introPara }} </v-card-text>
						<v-card-subtitle class="py-0"> Kinh phí: {{ item.priceRange }} </v-card-subtitle>
						<v-card-actions class="mt-3">
							<v-btn outlined rounded link>
								<router-link :to="{ path: '/destination/' + item.code }">
									Khám phá
								</router-link>
							</v-btn>
							<v-btn outlined rounded disabled> {{ item.province }} </v-btn>
						</v-card-actions>
					</div>
					<v-avatar size="125" class="mr-2">
						<v-img v-if="image[index]" :src="image[index]" :lazy-src="src"></v-img>
						<v-img v-else :src="src"></v-img>
					</v-avatar>
				</div>
			</v-card>
		</v-container>
	</v-container>
</template>

<script>
import ImageHeadPost from '../components/ImageHeadPost.vue';

export default {
	components: {
		ImageHeadPost,
	},
	data() {
		return {
			destination: [],
			src: require('../assets/image/vietnam-lanscape.jpg'),
			src2: require('../assets/image/1.png'),
			image: [],
		};
	},
	computed: {
		destinationMod() {
			const raw = this.destination;
			const compact = [];
			let formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
			for (const item of raw) {
				const ob = {};
				ob.name = item.name;
				ob.code = item.code;
				ob.address = item.address;
				ob.province = item.province.name;
				ob.priceRange =
					formatter.format(item.priceRange.minPrice) +
					' - ' +
					formatter.format(item.priceRange.maxPrice);
				ob.introPara = item.introPara.slice(0, 200) + '...';
				ob.avatar = item.avatar;
				ob.author = item.author.username;
				compact.push(ob);
			}
			return compact;
		},
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
