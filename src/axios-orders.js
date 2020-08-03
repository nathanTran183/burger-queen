import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-queen-1c536.firebaseio.com/'
});

export default instance;