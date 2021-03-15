import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://auth-production-90d68-default-rtdb.firebaseio.com/'
})

export default instance;