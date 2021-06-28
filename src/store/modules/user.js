//import axios from 'axios';

const state = {

	id: 'e5ccf424-45cb-4d1a-aede-b078ddf18738',

	'@id': '/api/users/e5ccf424-45cb-4d1a-aede-b078ddf18738',

	email: 'rekrutacja@e-transkryptor.eu',

	institution: {},

	subscriptions: [],

};

const getters = {

	authenticated: () => {

		return true;

		//return localStorage.getItem('jwt') ? true : false;

	},

};

const mutations = {

	setEmail(state, email) {

		state.email = email;

	},

	setInstitution(state, institution) {

		state.institution = institution;

	},

	addSubscription(state, subscription) {

		state.subscriptions.unshift(subscription);

	},

	removeSubscription(state, subscription) {

		const index = state.subscriptions.findIndex((item) => {

			return item.id === subscription.id;

		});

		if(-1 === index) return;

		state.subscriptions.splice(index, 1);

	},

	setSubscriptions(state, subscriptions) {

		state.subscriptions = subscriptions;

	}

};

const actions = {

	setEmail({commit, dispatch}, value) {

		commit('setEmail', value);

		dispatch('updateLocalUser');

	},

	setInstitution({commit, dispatch}, value) {

		commit('setInstitution', value);

		dispatch('updateLocalUser');

	},

	addSubscription({commit, dispatch}, value) {

		commit('addSubscription', value);

		dispatch('updateLocalUser');

	},

	removeSubscription({commit, dispatch}, value) {

		commit('removeSubscription', value);

		dispatch('updateLocalUser');

	},

	setSubscriptions({commit, dispatch}, value) {

		commit('setSubscriptions', value);

		dispatch('updateLocalUser');

	},

	updateLocalUser(context) {

		let user = {};

		const keys = Object.keys(context.state);

		keys.forEach((key) => {

			user[key] = context.state[key];

		});

		user = JSON.stringify(user);

		let jwt = JSON.parse(localStorage.getItem('jwt'));

		jwt.user = user;

		jwt = JSON.stringify(jwt);

		localStorage.setItem('jwt', jwt);

	},

	refreshUser(context) {

		if(!context.getters.authenticated) return;

		const jwt = JSON.parse(localStorage.getItem('jwt'));

		const user = JSON.parse(jwt.user);

		const keys = Object.keys(context.state);

		/*const capitalize = (string) => {

			return string.charAt(0).toUpperCase() + string.slice(1);

		}*/

		keys.forEach((key) => {

			context.state[key] = user[key];

		});

	}

};

export const user = {

	state,

	getters,

	mutations,

	actions

};