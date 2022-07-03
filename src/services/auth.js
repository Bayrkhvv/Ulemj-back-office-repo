import { isEmpty } from 'lodash';
import Client from '@/clients/apiClient';
import AuthTokenStorageService from '@/services/AuthTokenStorageService';

function handleNewTokens(accessToken) {
  AuthTokenStorageService.store(accessToken);
  Client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

const AuthService = {
  async authenticate(payload) {
    const data = {
      email: payload.email,
      password: payload.password,
    };

    const response = await Client.post(`${process.env.VUE_APP_API_URL}/login`, data);
    const { token } = response.data.data;
    handleNewTokens(token);

    return token;
  },

  logout() {
    return new Promise(resolve => {
      if (Client.defaults.headers.common) {
        const headersCommon = Client.defaults.headers.common;
        delete headersCommon.Authorization;
        Client.defaults.headers.common = headersCommon;
      }
      AuthTokenStorageService.clear();
      resolve();
    });
  },

  isAuthenticated() {
    return !isEmpty(AuthTokenStorageService.getAccessToken());
  },
};

export default AuthService;
