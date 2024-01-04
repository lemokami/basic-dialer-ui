import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'https://cerulean-marlin-wig.cyclic.app',
});

export default AXIOS;
