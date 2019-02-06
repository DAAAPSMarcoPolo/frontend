import { API_BASE_URL } from './config';

export default function apiFetch(endpoint, options = {}) {
  //
  // options.headers = {
  //   'x-access-token': 'token'
  // };
  options.headers = {
    'Content-Type': 'application/json',
  }

  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Token ${token}`;
  }
  console.log(`fetching from ${API_BASE_URL}${endpoint}`);
  return fetch(`${API_BASE_URL}${endpoint}`,options);
}
