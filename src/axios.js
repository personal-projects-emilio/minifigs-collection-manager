import axios from 'axios';

const instance = axios.create({
	baseURL: "https://minifigs-collection-manager.firebaseio.com"
});

export default instance;