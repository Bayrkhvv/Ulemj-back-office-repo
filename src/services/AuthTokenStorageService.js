import { USER_TOKEN_KEY } from '@/config';

const AuthTokenStorageService = {
  store(accessToken) {
    window.$cookies.set(USER_TOKEN_KEY, accessToken, '', '');
  },

  getAccessToken() {
    return window.$cookies.get(USER_TOKEN_KEY);
  },

  clear() {
    window.$cookies.remove(USER_TOKEN_KEY);
  },
};

export default AuthTokenStorageService;
