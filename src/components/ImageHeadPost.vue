<template>
	<v-card flat>
		<v-img :src="src" max-height="500px" min-height="200px" :height="height">
			<v-container style="height: 100%">
				<v-row align-self="center" style="height: 100%">
					<v-card-title>
						<h1 class="white--text text-h3 text-md-h2 font-weight-bold text-capitalize">
							{{ headline }}
						</h1>
					</v-card-title>
				</v-row>
			</v-container>
		</v-img>
	</v-card>
</template>

<script>
export default {
	props: {
		src: { type: String },
		headline: { type: String },
		height: { type: String },
	},
};
</script>

<style></style>
