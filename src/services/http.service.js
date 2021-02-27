import axios from 'axios';

import config from 'utils/config';

const http = axios.create({ baseURL: `${config.baseUrl}/` });

function getAuthHeader() {
  let authHeader = { 'Content-Type': 'application/json' };
  if (config.githubToken) {
    authHeader = {
      ...authHeader,
      Authorization: `token ${config.githubToken}`,
    };
  }
  return authHeader;
}

function get(url, headers = {}, params = {}) {
  return http.get(url, {
    params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function post(url, data, headers = {}, options = {}) {
  return http.post(url, data, {
    ...options,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function put(url, data, headers = {}, options = {}) {
  return http.post(url, data, {
    ...options,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function remove(url, headers = {}, options = {}) {
  return http.delete(url, {
    ...options,
    headers: { ...getAuthHeader(), ...headers },
  });
}

export default {
  http,
  get,
  post,
  put,
  remove,
};
