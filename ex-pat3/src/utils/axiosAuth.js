import axios from 'axios';

// use axiosWithAuth whenever the application needs to exchange data with a protected endpoint
export const axiosWithAuth = () => {  // token allows you to go to private route achieved by login
	const token = localStorage.getItem('token');

	return axios.create({
		baseURL: 'https://expat-journal-backend-jensen.herokuapp.com/',
		headers: {
			Authorization: token
		}
	});
};
