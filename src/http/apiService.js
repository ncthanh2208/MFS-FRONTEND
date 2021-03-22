import apiService from './interceptor';

class Http {
	static async getSth(endPoint, params) {
		const resp = await apiService.get(endPoint, params);
		return resp;
	}

	static async postSth(endPoint, body, options = {}) {
		const response = await apiService.post(endPoint, body, options);
		return response;
	}

	static async putSth(endPoint, body, params, options = {}) {
		const response = await apiService.put(endPoint, body, params, options);
		return response;
	}

	static async deleteSth(endPoint, params, options = {}) {
		const response = await apiService.delete(endPoint, params, options);
		return response;
	}
}

export default Http;
