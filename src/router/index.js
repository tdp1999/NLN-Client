import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index.js';

import HomePage from '../page/HomePage.vue';
import Introduction from '../page/Introduction.vue';
import Destination from '../page/Destination.vue';
import DestinationView from '../page/DestinationView.vue';
import DestinationDetail from '../page/DestinationDetail.vue';
import Search from '../page/Search.vue';
import Contact from '../page/Contact.vue';
import Page404 from '../page/404.vue';

import Dashboard from '../page/Admin.Dashboard.vue';
import AdminUserInfo from '../page/Admin.UserInfo.vue';
import AdminUserM from '../page/Admin.UserM.vue';
import AdminProv from '../page/Admin.Prov.vue';
import AdminDest from '../page/Admin.Dest.vue';
import AdminProvDetail from '../page/Admin.ProvDetail.vue';
import AdminDestDetail from '../page/Admin.DestDetail.vue';
import DashboardDetail from '../page/Admin.DashboardDetail.vue';

import testPage from '../page/Test_Upload.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
		props: true,
	},
	{
		path: '/testUpload',
		component: testPage,
	},
	{
		path: '/introduction',
		name: 'Introduction',
		component: Introduction,
	},
	{
		path: '/destination',
		component: DestinationView,
		children: [
			{
				path: '',
				component: Destination,
			},
			{
				path: ':dest',
				component: DestinationDetail,
				props: true,
			},
		],
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
		props: true,
	},
	{
		path: '/contact',
		name: 'Contact',
		component: Contact,
	},
	{
		path: '/dashboard',
		component: Dashboard,
		meta: { requiredAuth: true },
		children: [
			{
				path: '',
				component: DashboardDetail,
			},
			{
				path: 'destination',
				component: AdminDest,
			},
			{
				path: 'destination/:dest',
				component: AdminDestDetail,
				name: 'Destination Single',
			},
			{
				path: 'destination/add',
				component: AdminDestDetail,
				name: 'Add destination',
				props: true,
			},
			{
				path: 'province',
				component: AdminProv,
				name: 'Province',
			},
			{
				path: 'province/:prov',
				component: AdminProvDetail,
				name: 'ProvinceSingle',
			},
			{
				path: 'userInfo',
				component: AdminUserInfo,
			},
			{
				path: 'userManagement',
				component: AdminUserM,
			},
		],
	},
	{
		path: '*',
		component: Page404,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.afterEach((to) => {
	store.commit('currentPath', to.path);
});

router.beforeEach((to, from, next) => {
	const isToken = store.getters['user/isAuthenticated'];

	if (to.matched.some((record) => record.meta.requiredAuth)) {
		if (!isToken) next({ path: '/' });
		else next();
	} else next();
});

export default router;
