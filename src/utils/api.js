import { API_BASE_URL } from './config';
import { getFromLocalStorage, } from './localstorage';
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export function apiFetch(endpoint, options = {}) {
  //
  // options.headers = {
  //   'x-access-token': 'token'
  // };
  options.headers = {
    'Content-Type': 'application/json',
  };

  const token = getFromLocalStorage('token');

  if (token) {
    options.headers['Authorization'] = `Token ${token}`;
  }
  console.log(`fetching from ${API_BASE_URL}${endpoint}`);
  return fetch(`${API_BASE_URL}${endpoint}`,options);
}

// TODO make apiPost function that
/*export function apiPost(endpoint, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
  }
  options.method = 'POST';
  const token = getFromLocalStorage('token');
  if (token) {
    options.headers['Authorization'] = `Token ${token}`;
  }
  console.log(`POST ${API_BASE_URL}${endpoint}`);
  return fetch(`${API_BASE_URL}${endpoint}`,options);
}*/

export async function apiPost(endpoint, data = {}, includeToken = true, parent = null) {
  const config = {
    headers: []
  };
  const token = getFromLocalStorage('token');
  if (includeToken && token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  console.log(`POST ${API_BASE_URL}${endpoint}`);

  const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, config);

  if (response.status === 500) {
    console.log(`Server error (500): POST ${API_BASE_URL}${endpoint}`);
    console.log(`Message: ${response.statusText}`);
    if (parent) {
      parent.setState({error: response.statusText});
    }
    // TODO decide what else to do when there is a server error...
  }

  return response;

}

export async function apiPut(endpoint, data = {}, includeToken = true, parent = null) {
    const config = {
        headers: []
    };
    const token = getFromLocalStorage('token');
    if (includeToken && token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    console.log(`PUT ${API_BASE_URL}${endpoint}`);

    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, config);

    if (response.status === 500) {
        console.log(`Server error (500): POST ${API_BASE_URL}${endpoint}`);
        console.log(`Message: ${response.statusText}`);
        if (parent) {
            parent.setState({error: response.statusText});
        }
        // TODO decide what else to do when there is a server error...
    }

    return response;

}

export async function apiGet(endpoint, includeToken = true, parent = null) {
    const config = {
        headers: []
    };
    const token = getFromLocalStorage('token');
    if (includeToken && token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    console.log(`GET ${API_BASE_URL}${endpoint}`);

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 500) {
        console.log(`Server error (500): POST ${API_BASE_URL}${endpoint}`);
        console.log(`Message: ${response.statusText}`);
        if (parent) {
            parent.setState({error: response.statusText});
        }
        // TODO decide what else to do when there is a server error...
    }
    return response;
}
