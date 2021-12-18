<template>
	<v-container fluid class="pa-0">
		<ImageHeadPost :src="src" :headline="destInfo.name" height="100px" />
		<v-container fluid class="ma-2">
			<v-row class="ma-0 pa-0">
				<v-col cols="12" md="9">
					<v-img :src="avatar" max-height="600px" class="mb-8"></v-img>
					<div v-html="destInfo.content"></div>
				</v-col>
				<v-col cols="0" md="3">
					<v-card class="mb-4">
						<v-card-title class="text-uppercase">THÔNG TIN ĐIỂM ĐẾN</v-card-title>
						<v-card-text class="d-flex align-center pb-0">
							<v-icon left>mdi-folder</v-icon> Mã: {{ destInfo.code }}
						</v-card-text>
						<v-card-text class="pb-0">
							<v-icon left>mdi-folder</v-icon> Địa chỉ: {{ destInfo.address }}
						</v-card-text>
						<v-card-text class="pb-0">
							<v-icon left>mdi-folder</v-icon> Tỉnh: {{ destInfo.province.name }}
						</v-card-text>
						<v-card-text>
							<v-icon left>mdi-folder</v-icon> Tác giả: {{ destInfo.author.username }}
						</v-card-text>
					</v-card>
					<v-card class="my-4">
						<v-card-title class="text-uppercase">NHÃN</v-card-title>
						<v-card-text>
							<div>
								Mục đích du lịch:
								<span v-for="i in destInfo.category.purpose" :key="i"> {{ i }} </span>
							</div>
							<div>
								Đặc điểm địa lý:
								<span v-for="i in destInfo.category.geographical" :key="i">
									{{ i }}
								</span>
							</div>
							<div>
								Lứa tuổi phù hợp:
								<span v-for="i in destInfo.category.ages" :key="i"> {{ i }}, </span>
							</div>
						</v-card-text>
					</v-card>
					<v-card>
						<v-card-title class="text-uppercase">MAP</v-card-title>
						<v-card-subtitle></v-card-subtitle>
						<v-card-text v-html="destInfo.embeddedMap"></v-card-text>
					</v-card>
				</v-col>
			</v-row>
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
			src: require('../assets/image/black.png'),
			avatar: '',
			destInfo: {},
		};
	},
	mounted() {
		this.fetchData();
	},
	computed: {},
	methods: {
		fetchData() {
			this.$store.dispatch('destination/retrieveDestInfo', this.$route.params.dest).then((value) => {
				this.destInfo = value;

				if (value.avatar) {
					const arrayBufferView = new Uint8Array(value.avatar.data);
					const imageFile = new File([arrayBufferView], { type: 'image/jpeg' });
					this.readImage(imageFile);
				}
			});
		},
		readImage(imageFile) {
			let reader = new FileReader();
			reader.addEventListener(
				'load',
				() => {
					this.avatar = reader.result;
				},
				false
			);
			reader.readAsDataURL(imageFile);
		},
	},
};
</script>

<style></style>
