import axios from 'axios';
import humps from 'humps';
import AuthTokenStorageService from '@/services/AuthTokenStorageService';

const headers = {};

const accessToken = AuthTokenStorageService.getAccessToken();
if (accessToken) {
  headers.Authorization = `Bearer ${accessToken}`;
}

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers,

  transformRequest: [data => humps.decamelizeKeys(data), ...axios.defaults.transformRequest],

  transformResponse: [...axios.defaults.transformResponse, data => humps.camelizeKeys(data)],
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${process.env.VUE_APP_API_URL}/login`
    ) {
      AuthTokenStorageService.clear();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest.shouldRetry) {
      AuthTokenStorageService.clear();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
