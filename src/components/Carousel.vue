<template>
	<v-carousel hide-delimiters app height="auto">
		<v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"> </v-carousel-item>
	</v-carousel>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					src: require('../assets/image/1.png'),
				},
				{
					src: require('../assets/image/2.png'),
				},
				{
					src: require('../assets/image/3.png'),
				},
			],
		};
	},
};
</script>

<style></style>
