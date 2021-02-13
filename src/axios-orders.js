import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://facebook-blog-app-default-rtdb.firebaseio.com/'
})

export default instance;