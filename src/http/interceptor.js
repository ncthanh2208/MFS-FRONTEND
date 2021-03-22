import axios from 'axios';
const API_SERVER = 'http://localhost:9191/';

const TOKEN = localStorage.getItem('token') || '';
const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: API_SERVER,
	headers: {
		Authorization: TOKEN,
		mode: 'cors',
	},
});
const successHandler = (response) => {
	const isStatus = response.data.status;
	const { status: statusCode } = response;
	if (isStatus) {
		return {
			status: true,
			data: response.data.data|| null,
			statusCode,
		};
	}
	if (isStatus === false) {
		return {
			status: false,
			data: null,
		};
	}
	return {
		status: true,
		data: response.data || null,
		statusCode,
	};
};
const errorHandler = (error) => {
	const { status: statusCode } = error;
	return {
		status: false,
		error,
		statusCode,
		data: null,
	};
};
axiosInstance.interceptors.response.use(
	(response) => successHandler(response),
	(error) => errorHandler(error)
);

export default axiosInstance;
