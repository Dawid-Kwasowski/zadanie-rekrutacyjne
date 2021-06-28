export default class BaseClient {

	constructor() {

		
		
	}

}

/*import axios from 'axios';

const routes = require('./fos_js_routes.json');
import Routing from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';

Routing.setRoutingData(routes);

import authHeader from '../helpers/authHeader';

import authorizationException from '../helpers/authorizationException';

export default class BaseClient {

	constructor(resourceName) {

		if(this.constructor == BaseClient) {

			throw 'Cant`t initiate object of abstract class';

		}

		this.routing = Routing;
		this.resourceName = resourceName;
		this.axios = axios;
		
		this.getCollectionRoute = 'api_' + this.resourceName + '_get_collection';
		this.getItemRoute = 'api_' + this.resourceName + '_get_item';
		this.deleteItemRoute = 'api_' + this.resourceName + '_delete_item';
		this.postCollectionRoute = 'api_' + this.resourceName + '_post_collection';
		this.patchItemRoute = 'api_' + this.resourceName + '_patch_item';
		this.putItemRoute = 'api_' + this.resourceName + '_put_item';
		this.deleteItemFromTrashRoute = 'api_' + this.resourceName + '_delete_from_trash_item';
		this.restoreItemFromTrashRoute = 'api_' + this.resourceName + '_restore_from_trash_item';

	}

	static handleException(res) {

		if(res.status === 401) {

			localStorage.removeItem('jwt');

			location.reload(true);

		}

	}

	static async getCollection(params = {}) {

		let self = new this();

		return await self.axios.get(
			self.routing.generate(self.getCollectionRoute, params.params),
			{
				headers: authHeader()
			}
		).catch((err) => {

			authorizationException(err.response);

			return err;

		});

	}

	static async postItem(params = {}) {

		let self = new this();

		return await self.axios.post(
			self.routing.generate(self.postCollectionRoute, params.params),
			params.data,
			{
				headers: authHeader()
			}
		).catch((err) => {

			authorizationException(err.response);

			return err;

		});

	}

	static async getItem(params = {}) {

		let self = new this();

		return await self.axios.get(
			self.routing.generate(self.getItemRoute, params.params),
			{
				headers: authHeader()
			}
		).catch((err) => {

			authorizationException(err.response);

			return err;

		});

	}

	static async putItem(params = {}) {

		let self = new this();

		return await self.axios({
			method: 'PUT',
			url: self.routing.generate(self.putItemRoute, params.params),
			data: params.data,
			headers: authHeader()
		}).catch((err) => {

			authorizationException(err.response);

			return err;

		});

	}

	static async deleteItem(params = {}) {

		let self = new this();

		return await self.axios.delete(
			self.routing.generate(self.deleteItemRoute, params.params),
			{
				headers: authHeader()
			}
		).catch((err) => {

			authorizationException(err.response);

			return err;

		});

	}

	static async deleteItemFromTrash(params = {}) {

		let self = new this();

		return await self.axios.delete(
			self.routing.generate(self.deleteItemFromTrashRoute, params.params),
			{
				headers: authHeader()
			}
		).catch((err) => {

			authorizationException(err.response);

			return err;

		});

	}

	static async restoreItemFromTrash(params = {}) {

		let self = new this();

		return self.axios({

			method: 'PUT',
			url: self.routing.generate(self.restoreItemFromTrashRoute, params.params),
			data: params.data,
			headers: authHeader()
		
		}).catch((err) => {

			authorizationException(err.response);

			return err;

		});

	}

}*/