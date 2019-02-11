import { API_BASE_URL } from './config';
import { getFromLocalStorage, } from './localstorage';

export default function apiFetch(endpoint, options = {}) {
  //
  // options.headers = {
  //   'x-access-token': 'token'
  // };
  options.headers = {
    'Content-Type': 'application/json',
  }

  const token = getFromLocalStorage('token');

  if (token) {
    options.headers['Authorization'] = `Token ${token}`;
  }
  console.log(`fetching from ${API_BASE_URL}${endpoint}`);
  return fetch(`${API_BASE_URL}${endpoint}`,options);
}