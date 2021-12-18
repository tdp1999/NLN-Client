<template>
	<v-app>
		<AdminNav />
		<v-main>
			<slot />
		</v-main>
	</v-app>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
export default {
	components: {
		AdminNav,
	},
};
</script>

<style></style>
