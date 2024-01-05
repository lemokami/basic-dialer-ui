import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://cerulean-marlin-wig.cyclic.app',
});

export default Axios;
