<template>
	<v-container fluid pa-0>
		<v-row class="my-3 ml-4 mr-4">
			<v-col cols="12" md="5">
				<h1 class="text-h2 font-weight-medium">Du lịch Miền Tây? Hãy giao cho chúng tôi!</h1>
				<p class="font-weight-light my-5">
					Du lịch Miền Tây là website giới thiệu các địa điểm du lịch nổi tiếng, mới mẻ và hấp dẫn
					cho người du lịch. Chúng tôi mang đến những thông tin cơ bản nhất - địa chỉ, kinh phí -
					cho đến những trải nghiệm cá nhân chi tiết nhất!
				</p>
				<p class="text-overline">Khám phá ngay - Rất nhiều thông tin bổ ích đang chờ đợi bạn.</p>

				<v-btn class="success" link to="/destination">THAM KHẢO CÁC ĐIỂM ĐẾN</v-btn>
			</v-col>
			<v-col>
				<v-img :src="src" max-height="500" contain class="hidden-sm-and-down"></v-img>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			src: require('../assets/illus/art1.svg'),
		};
	},
};
</script>

<style></style>
