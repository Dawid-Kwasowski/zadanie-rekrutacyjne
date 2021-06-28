<template>
	
	<v-app>

		<navigation-drawer
			:home="home"
			ref="navigationDrawer"
		></navigation-drawer>

		<app-bar
			:home="home"
			v-on:drawer="drawer"
			ref="appBar"
		></app-bar>

		<v-main
			:class="home ? 'home' : 'default'"
		>
				
			<router-view :key="$route.fullPath"></router-view>

		</v-main>

		<v-footer padless>

			<v-col
				class="text-center"
				cols="12"
			>
				
				{{ new Date().getFullYear() }} — <strong>DSM Cloud</strong> | Alpha 1.0.0
			
			</v-col>

		</v-footer>

	</v-app>

</template>

<script>

	import AppBar from './views/inc/AppBar';

	import NavigationDrawer from './views/inc/NavigationDrawer';

	//import axios from 'axios';

	import { mapActions } from 'vuex';
	
	export default {
		
		/*data: () => ({

			drawer: true,

		}),*/

		components: {

			AppBar,

			NavigationDrawer

		},

		computed: {

			home: function() {

				const routes = [
					'/',
					'/zaloguj',
					'/przywroc-haslo'
				];

				return routes.includes(this.$route.fullPath);

			}

		},

		watch: {

			$route: function(to, from) {

				if('teams_path' === to.name) {

					this.$refs.appBar.drawer = false;
					this.$refs.navigationDrawer.drawer = false;

				}else if('main_path' === from.name && 'teams_path' !== to.name) {

					this.$refs.appBar.drawer = true;
					this.$refs.navigationDrawer.drawer = true;

				}

			}

		},

		methods: {

			...mapActions(['refresh']),

			drawer(val) {

				this.$refs.navigationDrawer.drawer = val;

			}

		},

		/*beforeCreate() {

			this.$store.dispatch('refreshUser');

		}*/

	}

</script>

<style>
	
	.home {

		background-image: url("./images/background.jpg");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

	}

	.default {

		background-color: #FAFAFA;

	}

</style>