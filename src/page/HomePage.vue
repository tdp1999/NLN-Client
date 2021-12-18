<template>
	<normal-layout>
		<IllusArt />
		<SmallSearch />
		<BriefDest />
		<SignIn />
	</normal-layout>
</template>

<script>
import IllusArt from '../components/IllusArt.vue';
import SmallSearch from '../components/SmallSearch.vue';
import BriefDest from '../components/BriefDest.vue';
import SignIn from '../components/SignIn.vue';
export default {
	components: {
		IllusArt,
		SmallSearch,
		BriefDest,
		SignIn,
	},
	data() {
		return {};
	},
	computed: {
		userInfo() {
			return this.$store.getters['user/showUserInfo'];
		},
	},
};
</script>

<style></style>
