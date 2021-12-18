<template>
	<v-footer dark>
		<v-row no-gutters class="py-8 px-4">
			<v-col col="12" md="4">
				<v-row class="text-h5 text-uppercase py-8" no-gutters>
					<span class="font-weight-thin">Thunder</span>
					<span>Phong</span>
				</v-row>

				<v-row no-gutters>
					<v-icon class="mx-2" v-for="network in socialNetworks" :key="network.title">{{
						network.icon
					}}</v-icon>
				</v-row>

				<v-row class="py-8 text-caption font-weight-thin" no-gutters>
					© {{ new Date().getFullYear() }} — ThunderPhong, Ltd. All Rights Reserved.</v-row
				>
			</v-col>

			<v-col cols="0" md="8">
				<v-row no-gutters>
					<v-col v-for="item in menuItems" :key="item.title" cols="4">
						<p class="teal--text text--lighten-1 font-weight-medium">{{ item.title }}</p>
						<ul class="modified-list pa-0">
							<li
								v-for="(value, i) in item.value"
								:key="i"
								class="text-body-2 text-capitalize my-3 link-likable"
								to="#"
								@click="displayChoose(value)"
							>
								{{ value }}
							</li>
						</ul>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
export default {
	data() {
		return {
			socialNetworks: [
				{ title: 'facebook', icon: 'mdi-facebook' },
				{ title: 'youtube', icon: 'mdi-youtube' },
				{ title: 'twitter', icon: 'mdi-twitter' },
				{ title: 'linkedin', icon: 'mdi-linkedin' },
			],
			menuItems: [
				{ title: 'Mục đích', value: ['nghỉ dưỡng', 'sinh thái', 'VH-LS', 'khám phá', 'khác'] },
				{ title: 'Địa lý', value: ['biển', 'núi', 'dã ngoại', 'miệt vườn'] },
				{ title: 'Lứa tuổi', value: ['thanh niên', 'trung niên', 'cao tuổi'] },
			],
		};
	},
	methods: {
		displayChoose(value) {
			console.log(value);
		},
	},
};
</script>

<style scoped>
.modified-list {
	list-style-type: none;
}

.link-likable {
	cursor: pointer;
}

.link-likable:hover {
	color: #26a69a;
}
</style>
