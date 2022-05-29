import axios from 'axios';
const instance = axios.create({baseURL: 'https://uplooads.herokuapp.com'});
export default instance