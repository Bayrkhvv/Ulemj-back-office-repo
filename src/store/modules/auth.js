import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '@/store/actions/auth';
import { handleRequestError } from '@/utils/error';
import AuthService from '@/services/auth';
import AuthTokenStorageService from '@/services/AuthTokenStorageService';

const state = {
  token: AuthTokenStorageService.getAccessToken() || '',
  status: '',
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  authToken: state => state.token,
};

const actions = {
  [AUTH_REQUEST]: async ({ commit }, payload) => {
    commit(AUTH_REQUEST);
    try {
      commit(AUTH_SUCCESS, await AuthService.authenticate(payload));
    } catch (error) {
      commit(AUTH_ERROR, error);

      handleRequestError(error, false);
    }
  },

  [AUTH_LOGOUT]: ({ commit }) => {
    commit(AUTH_LOGOUT);
    return AuthService.logout();
  },
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
  [AUTH_ERROR]: state => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: state => {
    state.token = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
