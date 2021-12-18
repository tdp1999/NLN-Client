<template>
	<normal-layout>
		<v-container fluid class="pa-0">
			<ImageHeadPost :src="src.pic1" :headline="hl" height="200px" />

			<v-row class="justify-center align-center my-8">
				<v-col cols="8" sm="8">
					<v-form ref="form" @submit.prevent>
						<v-text-field
							v-model="searchText"
							label="Tìm kiếm địa điểm"
							autofocus
							prepend-inner-icon="mdi-magnify"
							hide-details="auto"
							rounded
							outlined
							clearable
							placeholder="Địa danh, tỉnh, ..."
						>
						</v-text-field>
					</v-form>
				</v-col>
			</v-row>

			<v-container>
				<v-row>
					<v-col cols="0" sm="4">
						<v-card flat>
							<v-card-title> Tỉnh </v-card-title>
							<v-card-text>
								<v-select
									:items="provinceList"
									v-model="filter.prov"
									outlined
									dense
									solo
								></v-select>
							</v-card-text>

							<v-divider></v-divider>

							<v-card-title> LỌC </v-card-title>
							<v-card-text>
								<v-subheader class="pa-0 text-overline">Mục đích chuyến đi</v-subheader>
								<v-checkbox
									v-for="item in category.purpose"
									:key="item.value"
									v-model="filter.purpose"
									:label="item.label"
									:value="item.value"
									hide-details
								></v-checkbox>

								<v-subheader class="pa-0 mt-10 text-overline"
									>Đặc điểm địa lý</v-subheader
								>
								<v-checkbox
									v-for="item in category.geographical"
									:key="item.value"
									v-model="filter.geographical"
									:label="item.label"
									:value="item.value"
									hide-details
								></v-checkbox>

								<v-subheader class="pa-0 mt-10 text-overline"
									>Lứa tuổi phù hợp</v-subheader
								>
								<v-checkbox
									v-for="item in category.ages"
									:key="item.value"
									v-model="filter.ages"
									:label="item.label"
									:value="item.value"
									hide-details
								></v-checkbox>
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" sm="8">
						<v-row v-for="item in modifiedPage" :key="item.code">
							<v-col cols="12">
								<v-card flat outlined>
									<v-row>
										<v-col cols="0" sm="2">
											<v-avatar tile size="100%">
												<v-img :src="src.pic1"></v-img>
											</v-avatar>
										</v-col>
										<v-col cols="12" sm="10">
											<v-row
												class="d-flex flex-no-wrap justify-space-between align-center"
											>
												<v-col cols="9">
													<v-card-title class="text-capitalize">{{
														item.name
													}}</v-card-title>
													<v-card-subtitle
														class="d-flex align-center text-caption text-capitalize"
													>
														<v-row
															class="align-center"
															style="width=100%"
														>
															<v-col cols="8">
																<v-icon left
																	>mdi-folder</v-icon
																>
																{{ item.address }}
															</v-col>
															<v-col cols="4">
																<v-icon left
																	>mdi-folder</v-icon
																>
																{{ item.province.name }}
															</v-col>
														</v-row>
													</v-card-subtitle>
												</v-col>

												<v-col cols="3">
													<v-card-actions
														><v-btn
															><router-link
																:to="{
																	path:
																		'/destination/' +
																		item.code,
																}"
																>XEM THÊM</router-link
															></v-btn
														></v-card-actions
													>
												</v-col>
											</v-row>
										</v-col>
									</v-row>
								</v-card>
							</v-col>
						</v-row>

						<v-pagination v-model="page" :length="length" class="my-8"></v-pagination>
					</v-col>
				</v-row>
			</v-container>
		</v-container>
	</normal-layout>
</template>

<script>
import ImageHeadPost from '../components/ImageHeadPost.vue';
export default {
	props: {
		searchTextProps: {
			type: String,
			default: '',
		},
	},
	components: {
		ImageHeadPost,
	},
	data() {
		return {
			src: {
				pic1: require('../assets/image/vietnam-lanscape.jpg'),
			},
			page: 1,
			destInfo: {},
			searchText: this.searchTextProps,
			provinceList: [
				'Tất cả',
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
			category: {
				purpose: [
					{ label: 'Du lịch nghỉ dưỡng', value: 'resort' },
					{ label: 'Du lịch sinh thái', value: 'eco' },
					{ label: 'Du lịch văn hóa, lịch sử', value: 'cultural and historical' },
					{ label: 'Du lịch khám phá', value: 'visit and explore' },
					{ label: 'Du lịch khác', value: 'otherP' },
				],
				geographical: [
					{ label: 'Du lịch biển', value: 'sea' },
					{ label: 'Du lịch núi', value: 'mountain' },
					{ label: 'Du lịch dã ngoại', value: 'picnic' },
					{ label: 'Du lịch miệt vườn', value: 'countryside' },
					{ label: 'Du lịch khác', value: 'other' },
				],
				ages: [
					{ label: 'Du lịch thanh niên', value: 'youth' },
					{ label: 'Du lịch trung niên', value: 'middle-age' },
					{ label: 'Du lịch người cao tuổi', value: 'aged' },
				],
			},
			filter: {
				purpose: [],
				geographical: [],
				ages: [],
				prov: '',
			},
			destArray: [],
			fullDest: [],
			filterOption: [],
		};
	},
	mounted() {
		this.fetchData();
	},
	computed: {
		hl() {
			return 'ĐIỂM ĐẾN: ' + this.destArray.length + ' NƠI';
		},
		modifiedPage() {
			return this.destArray.slice((this.page - 1) * 10, this.page * 10 - 1);
		},
		length() {
			return Math.ceil(this.destArray.length / 10);
		},
	},
	watch: {
		searchText(text) {
			if (text == '') this.destArray = this.fullDest;
			else if (this.searchTextProps)
				this.destArray = this.fullDest.filter((value) => value.name.includes(this.searchTextProps));
			else this.destArray = this.fullDest.filter((value) => value.name.includes(text));
		},
		filter: {
			handler: function(newV) {
				const insideArray = this.fullDest;
				const insideArray1 = this.provinceFilter(insideArray, newV.prov);
				const insideArray2 = this.selectFilter(insideArray1, 'purpose', newV.purpose);
				const insideArray3 = this.selectFilter(insideArray2, 'geographical', newV.geographical);
				const insideArray4 = this.selectFilter(insideArray3, 'ages', newV.ages);
				this.destArray = insideArray4;
			},
			deep: true,
		},
	},
	methods: {
		fetchData() {
			this.$store.dispatch('destination/retrieveDestArray').then((value) => {
				this.destArray = value;
				this.fullDest = value;
			});
		},
		provinceFilter(array, prov) {
			if (prov == '' || prov == 'Tất cả') return this.fullDest;
			return array.filter((item) => item.province.name == prov.toLowerCase());
		},
		selectFilter(array, category, fil) {
			if (fil.length == 0) return array;

			array = array.filter((value) => {
				let state = true;
				for (let i of fil) {
					if (!value.category[category].includes(i)) state = false;
				}
				return state;
			});
			return array;
		},
	},
};
</script>

<style></style>
