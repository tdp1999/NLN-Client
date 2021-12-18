module.exports.readImage = (data) => {
	const arrayBufferView = new Uint8Array(data);
	let imageFile = new File([arrayBufferView], { type: 'image/jpeg' });

	let reader = new FileReader();
	reader.addEventListener('load', () => {
		reader.result;
	}).then((value) => console.log(value));
	reader.readAsDataURL(imageFile);
};
