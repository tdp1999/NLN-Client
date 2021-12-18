<template>
	<normal-layout>
		<ImageHeadPost :src="src" headline="GIỚI THIỆU" />

		<v-container class="mt-16">
			<h2>Who we are</h2>
			<p>
				Rough Guides is a pioneering global travel brand that’s provided trusted travel advice since
				1982, when founder Mark Ellingham published the Rough Guide to Greece. Combining a journalistic
				approach with an understanding of what travellers really need to know, the book’s instant
				success spawned a series that quickly covered dozens of destinations, attracting a loyal
				readership hungry for Rough Guides’ trademark “tell-it-like-it-is” ethos. In November 2017,
				Rough Guides became part of Apa Publications, joining Insight Guides and Berlitz Publishing, and
				expanding to become a full service travel platform, offering tailor-made trips alongside our
				ground-breaking guidebooks.
			</p>
			<h2>Who we are</h2>
			<p>
				Rough Guides is a pioneering global travel brand that’s provided trusted travel advice since
				1982, when founder Mark Ellingham published the Rough Guide to Greece. Combining a journalistic
				approach with an understanding of what travellers really need to know, the book’s instant
				success spawned a series that quickly covered dozens of destinations, attracting a loyal
				readership hungry for Rough Guides’ trademark “tell-it-like-it-is” ethos. In November 2017,
				Rough Guides became part of Apa Publications, joining Insight Guides and Berlitz Publishing, and
				expanding to become a full service travel platform, offering tailor-made trips alongside our
				ground-breaking guidebooks.
			</p>
			<h2>Who we are</h2>
			<p>
				Rough Guides is a pioneering global travel brand that’s provided trusted travel advice since
				1982, when founder Mark Ellingham published the Rough Guide to Greece. Combining a journalistic
				approach with an understanding of what travellers really need to know, the book’s instant
				success spawned a series that quickly covered dozens of destinations, attracting a loyal
				readership hungry for Rough Guides’ trademark “tell-it-like-it-is” ethos. In November 2017,
				Rough Guides became part of Apa Publications, joining Insight Guides and Berlitz Publishing, and
				expanding to become a full service travel platform, offering tailor-made trips alongside our
				ground-breaking guidebooks.
			</p>
		</v-container>
		<SignIn />
	</normal-layout>
</template>

<script>
import SignIn from '../components/SignIn.vue';
import ImageHeadPost from '../components/ImageHeadPost.vue';
export default {
	components: {
		SignIn,
		ImageHeadPost,
	},
	data() {
		return {
			src: require('../assets/image/phu-quoc-beach.jpg'),
		};
	},
};
</script>

<style></style>
