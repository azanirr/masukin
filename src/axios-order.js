import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-faf6b.firebaseio.com/'
});

export default instance;