import {API_BASE_URL} from './config';
import {getFromLocalStorage,} from './localstorage';
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;


const Request = async (config, includeToken) => {
    config.headers = config.headers ? config.headers : {};
    config.headers['Content-Type'] = 'application/json';
    const token = getFromLocalStorage('token');
    if (includeToken && token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    let response;
    try {
        response = await axios(config);
        return response;
    } catch (error) {
        return error.response;
    }
}

const Post = async (endpoint, data, includeToken = true, options = {}) => {
    const config = {
        url: `${API_BASE_URL}${endpoint}`,
        method: 'post',
        data
    }
    const response = await Request(config, includeToken);
    if (response.status === 500) {
        console.log(`Server error (500): POST ${API_BASE_URL}${endpoint}`);
        console.log(`Message: ${response.statusText}`);
    }
    return response;
}

const Get = async (endpoint, includeToken = true, options = {}) => {
    const config = {
        url: `${API_BASE_URL}${endpoint}`,
        method: 'get',
    }
    const response = await Request(config, includeToken);
    if (response.status === 500) {
        console.log(`Server error (500): GET ${API_BASE_URL}${endpoint}`);
        console.log(`Message: ${response.statusText}`);
    }
    return response;
}

const Put = async (endpoint, includeToken = true, options = {}) => {
    const config = {
        url: `${API_BASE_URL}${endpoint}`,
        method: 'put',
    }
    const response = await Request(config, includeToken);
    if (response.status === 500) {
        console.log(`Server error (500): PUT ${API_BASE_URL}${endpoint}`);
        console.log(`Message: ${response.statusText}`);
    }
    return response;
}

const Delete = async (endpoint, includeToken = true, options = {}) => {
    const config = {
        url: `${API_BASE_URL}${endpoint}`,
        method: 'delete',
    }
    const response = await Request(config, includeToken);
    if (response.status === 500) {
        console.log(`Server error (500): DELETE ${API_BASE_URL}${endpoint}`);
        console.log(`Message: ${response.statusText}`);
    }
    return response;
}

export default {Post, Get, Put, Delete};