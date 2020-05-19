import axios from 'axios';

// eslint-disable-next-line
const baseURLLocal = 'http://localhost:4000';
// eslint-disable-next-line
const baseURLHeroku = 'https://cryptic-castle-95582.herokuapp.com'

const instance = axios.create({
  baseURL: baseURLHeroku
});

export default instance;