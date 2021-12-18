<template>
	<div>
		<v-snackbar v-model="snackbarFail">
			Action fail!

			<template v-slot:action="{ attrs }">
				<v-btn color="warning" text v-bind="attrs" @click="snackbarFail = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>

		<v-snackbar v-model="snackbarSuccess">
			Action success!

			<template v-slot:action="{ attrs }">
				<v-btn color="success" text v-bind="attrs" @click="snackbarSuccess = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
export default {
	props: ['fail', 'success'],
	data() {
		return {
			snackbarFail: false,
			snackbarSuccess: false,
		};
	},

	watch: {
		fail(value) {
			this.snackbarFail = value;
		},
		success(value) {
			this.snackbarSuccess = value;
		},
	},
};
</script>

<style></style>
