import axios from 'axios';

// eslint-disable-next-line
const baseURLLocal = 'http://localhost:4000';
// eslint-disable-next-line
const baseURLHeroku = 'https://rocket-server.onrender.com'

const instance = axios.create({
  baseURL: baseURLHeroku
});

export default instance;