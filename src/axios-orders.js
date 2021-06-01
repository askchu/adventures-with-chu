import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://adventures-with-chu-default-rtdb.firebaseio.com/'
})

export default instance;