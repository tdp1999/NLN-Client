<template>
	<v-container>
		<template>
			<v-file-input v-model="file" accept="image/*" label="Add Image"></v-file-input>
			<v-btn @click="submitImage">Submit</v-btn>
		</template>
		<div>
			<v-img :src="imageURL"></v-img>
		</div>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			file: null,
			imageURL: null,
		};
	},
	methods: {
		submitImage() {
			console.log('Raw: ', this.file); // Blob
			let reader = new FileReader();
			reader.addEventListener('load', () => {
				this.imageURL = reader.result;
				console.log('Image URL: ', this.imageURL); // Base 64
			});
			reader.readAsDataURL(this.file);

			const formData = new FormData();
			formData.append('avatar', this.file, this.file.name);

			const token = localStorage.getItem('token');

			fetch('http://localhost:3000/destination/avatar/NuiCamAnGiang', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
				.then((res) => res.json())
				.then((responseData) => console.log(responseData));
		},
	},
};
</script>

<style></style>
