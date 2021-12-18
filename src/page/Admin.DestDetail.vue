<template>
	<v-container fluid>
		<h2>Update Destination</h2>
		<div v-if="loading">Loading...</div>
		<template v-else>
			<!-- Row for name  -->
			<v-row>
				<v-col>
					<v-card flat>
						<v-card-text class="pa-0 pt-2">
							<v-text-field v-model="name" :rules="[rules.required]" outlined>
							</v-text-field>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<!-- Row for content and information col -->
			<v-row class="ma-0 pa-0">
				<v-col cols="12" lg="8" class="pa-0 pb-md-2">
					<v-card flat>
						<v-card-text class="pa-0 pr-3">
							<tiptap-vuetify
								v-model="content"
								:extensions="extensions"
								:toolbar-attributes="{ color: 'yellow' }"
								placeholder="Write something …"
								min-height="350px"
							/>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col class="pa-0" cols="0" lg="4">
					<v-card outlined>
						<v-card-title>Information</v-card-title>
						<v-card-text>
							<v-form ref="form" v-model="valid" lazy-validation class="mb-3">
								<v-row class="align-center mx-1 mb-1">
									<span v-if="!blank">
										<v-icon left>mdi-folder</v-icon> Code: {{ code }}</span
									>
									<v-text-field
										v-else
										prepend-icon="mdi-folder"
										label="Code"
										:rules="[rules.required, rules.code]"
										v-model="code"
										outlined
										hide-details
										dense
									>
									</v-text-field>
								</v-row>
								<v-row class="align-center mx-1 mb-1">
									<span>
										<v-icon left>mdi-folder</v-icon> Author: {{ author }}</span
									>
								</v-row>
								<v-row class="align-center mx-1 mb-1">
									<v-text-field
										prepend-icon="mdi-folder"
										label="Address"
										:rules="[rules.required]"
										v-model="address"
										outlined
										hide-details
										dense
									>
									</v-text-field>
								</v-row>
								<v-row class="align-center mx-1 mb-1">
									<v-select
										prepend-icon="mdi-folder"
										v-model="province"
										:items="provinces"
										outlined
										hide-details
										dense
									></v-select>
								</v-row>
								<v-row class="align-center mx-1 mb-1">
									<v-text-field
										prepend-icon="mdi-folder"
										label="Minimum price"
										:rules="[rules.required, rules.min]"
										v-model="priceRange[0]"
										outlined
										hide-details
										dense
									>
									</v-text-field>
								</v-row>
								<v-row class="align-center mx-1 mb-1">
									<v-text-field
										prepend-icon="mdi-folder"
										label="Maximum price"
										:rules="[rules.required, rules.min]"
										v-model="priceRange[1]"
										outlined
										hide-details
										dense
									>
									</v-text-field>
								</v-row>
							</v-form>

							<v-row justify="center" class="pt-2 pb-2">
								<v-btn class="primary" large text :disabled="!valid" @click="submit"
									>submit change</v-btn
								>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<!-- Row for the rest -->
			<v-row>
				<v-col cols="12" md="8">
					<v-card flat outlined>
						<v-card-title>
							Travel Category
						</v-card-title>
						<v-row>
							<v-col cols="4">
								<v-card-text>
									<p class="text-capitalize">{{ Object.keys(category)[0] }}</p>
									<v-checkbox
										v-model="category.purpose"
										label="Du lịch nghỉ dưỡng"
										value="resort"
									></v-checkbox>
									<v-checkbox
										v-model="category.purpose"
										label="Du lịch sinh thái"
										value="eco"
									></v-checkbox>
									<v-checkbox
										v-model="category.purpose"
										label="Du lịch văn hóa, lịch sử"
										value="cultural and historical"
									></v-checkbox>
									<v-checkbox
										v-model="category.purpose"
										label="Du lịch khám phá"
										value="visit and explore"
									></v-checkbox>
									<v-checkbox
										v-model="category.purpose"
										label="Du lịch khác"
										value="otherP"
									></v-checkbox>
								</v-card-text>
							</v-col>

							<v-col cols="4">
								<v-card-text>
									<p class="text-capitalize">{{ Object.keys(category)[1] }}</p>
									<v-checkbox
										v-model="category.geographical"
										label="Du lịch biển"
										value="sea"
									></v-checkbox>
									<v-checkbox
										v-model="category.geographical"
										label="Du lịch núi"
										value="mountain"
									></v-checkbox>
									<v-checkbox
										v-model="category.geographical"
										label="Du lịch dã ngoại"
										value="picnic"
									></v-checkbox>
									<v-checkbox
										v-model="category.geographical"
										label="Du lịch miệt vườn"
										value="countryside"
									></v-checkbox>
									<v-checkbox
										v-model="category.geographical"
										label="Du lịch khác"
										value="other"
									></v-checkbox>
								</v-card-text>
							</v-col>

							<v-col cols="4">
								<v-card-text>
									<p class="text-capitalize">{{ Object.keys(category)[2] }}</p>
									<v-checkbox
										v-model="category.ages"
										label="Du lịch thanh niên"
										value="youth"
									></v-checkbox>
									<v-checkbox
										v-model="category.ages"
										label="Du lịch trung niên"
										value="middle-age"
									></v-checkbox>
									<v-checkbox
										v-model="category.ages"
										label="Du lịch người cao tuổi"
										value="aged"
									></v-checkbox>
								</v-card-text>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
				<v-col cols="0" md="4" class="pa-0">
					<v-card flat>
						<v-card-title class="pa-0 ml-4">Introduction Para</v-card-title>
						<v-card-text>
							<v-textarea v-model="introPara" outlined hide-details> </v-textarea>
						</v-card-text>
					</v-card>
					<v-card flat>
						<v-card-title class="pa-0 ml-4 mt-4">Google Map Embedded URL</v-card-title>
						<v-card-text>
							<v-textarea v-model="urlMap" outlined hide-details> </v-textarea>
						</v-card-text>
					</v-card>
					<v-card flat>
						<v-card-title class="pa-0 ml-4 mt-4">Feature Image</v-card-title>
						<v-card-text v-if="imageFile">
							<v-img :src="imageURL"></v-img>
						</v-card-text>
						<v-card-text>
							<v-file-input
								v-model="imageFile"
								accept="image/*"
								label="Add Image"
								show-size
							></v-file-input>
							<v-btn @click="submitImage">Submit</v-btn>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</template>

		<Snackbar :fail="snackbarFail" :success="snackbarSuccess" />
	</v-container>
</template>

<script>
import {
	TiptapVuetify,
	Heading,
	Bold,
	Italic,
	Strike,
	Underline,
	Code,
	Paragraph,
	BulletList,
	OrderedList,
	Image,
	ListItem,
	Link,
	Blockquote,
	HardBreak,
	HorizontalRule,
	History,
} from 'tiptap-vuetify';

import Snackbar from '../components/Snackbar.vue';
export default {
	components: { TiptapVuetify, Snackbar },
	props: {
		blank: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			loading: true,
			extensions: [
				History,
				Blockquote,
				Link,
				Underline,
				Strike,
				Italic,
				ListItem,
				BulletList,
				OrderedList,
				Image,
				[
					Heading,
					{
						options: {
							levels: [1, 2, 3],
						},
					},
				],
				Bold,
				Code,
				HorizontalRule,
				Paragraph,
				HardBreak,
			],
			content: '',
			snackbarFail: false,
			snackbarSuccess: false,
			name: '',
			address: '',
			author: '',
			code: '',
			urlMap: '',
			priceRange: {},
			category: { purpose: [], geographical: [], ages: [] },
			introPara: '',
			province: '',
			provinces: [
				'Cần Thơ',
				'An Giang',
				'Tiền Giang',
				'Bến Tre',
				'Vĩnh Long',
				'Trà Vinh',
				'Hậu Giang',
				'Sóc Trăng',
				'Đồng Tháp',
				'Kiên Giang',
				'Cà Mau',
				'Long An',
				'Bạc Liêu',
			],
			rules: {
				required: (v) => !!v || 'This field is required!',
				min: (v) => (v && v > 0) || 'Price must be greater than 0',
				code: (v) => /^[a-zA-Z]+$/.test(v) || 'Code must not have space',
			},
			valid: true,
			imageFile: null,
			imageURL: null,
		};
	},
	mounted() {
		if (!this.blank) {
			this.fetchData();
			this.loading = false;
		} else {
			this.loading = false;
			console.log('BLANK PAGE');
		}
	},
	computed: {},
	methods: {
		fetchData() {
			this.$store.dispatch('destination/retrieveDestInfo', this.$route.params.dest).then((value) => {
				this.destInfo = value;
				this.code = value.code;
				this.author = value.author.username;
				this.content = value.content;
				this.name = value.name;
				this.address = value.address;
				this.priceRange = [value.priceRange.minPrice, value.priceRange.maxPrice];
				this.category = value.category;
				this.province = this.capitalize(value.province.name);
				this.introPara = value.introPara;
				this.urlMap = value.embeddedMap;

				if (value.avatar) {
					const arrayBufferView = new Uint8Array(value.avatar.data);
					this.imageFile = new File([arrayBufferView], { type: 'image/jpeg' });
					this.readImage(this.imageFile);
				}
			});
		},

		capitalize(words) {
			const separateWord = words.toLowerCase().split(' ');
			for (let i = 0; i < separateWord.length; i++) {
				separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
			}
			return separateWord.join(' ');
		},

		submit() {
			if (!this.blank)
				this.$store
					.dispatch('destination/updateContentDest', {
						dest: this.code,
						name: this.name,
						content: this.content,
						address: this.address,
						province: this.province.toLowerCase(),
						introPara: this.introPara,
						priceRange: { minPrice: this.priceRange[0], maxPrice: this.priceRange[1] },
						category: this.category,
						embeddedMap: this.urlMap,
					})
					.then((value) => {
						console.log(value);
						if (value) this.snackbarSuccess = true;
						else this.snackbarFail = true;
					});
			else {
				this.$store
					.dispatch('destination/addDest', {
						code: this.code,
						name: this.name,
						content: this.content,
						address: this.address,
						province: this.province.toLowerCase(),
						introPara: this.introPara,
						priceRange: { minPrice: this.priceRange[0], maxPrice: this.priceRange[1] },
						category: this.category,
						embeddedMap: this.urlMap,
					})
					.then((value) => {
						if (typeof value == 'object') this.snackbarFail = true;
						else this.snackbarSuccess = true;
					});
			}
		},
		readImage(imageFile) {
			let reader = new FileReader();
			reader.addEventListener(
				'load',
				() => {
					this.imageURL = reader.result;
				},
				false
			);
			reader.readAsDataURL(imageFile);
		},
		submitImage() {
			this.readImage(this.imageFile);

			const formData = new FormData();
			formData.append('avatar', this.imageFile, this.imageFile.name);

			const token = localStorage.getItem('token');

			fetch('http://localhost:3000/destination/avatar/' + this.code, {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
				.then((res) => res.json())
				.then((responseData) => console.log(responseData.ok));
		},
	},
};
</script>

<style></style>
