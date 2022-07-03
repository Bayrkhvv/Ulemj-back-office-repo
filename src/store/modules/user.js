import Vue from 'vue';
import { assign } from 'lodash';
import {
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  USER_PROFILE_UPDATE,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_ERROR,
} from '@/store/actions/user';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import { handleRequestError } from '@/utils/error';
import Repository, { USERS } from '@/repositories/RepositoryFactory';

const UsersRepository = Repository.get(USERS);

const state = {
  status: '',
  error: '',
  profile: {},
  isUserRegistrationSuccessful: null,
};

const getters = {
  isUserRegistrationSuccessful: state => state.isUserRegistrationSuccessful,
  userStatus: state => state.status,
  isProfileLoaded: state => !!state.profile.email || !!state.profile.phone,
  me: state => state.profile,
};

const actions = {
  [USER_REQUEST]: async ({ commit }) => {
    commit(USER_REQUEST);
    try {
      commit(USER_SUCCESS, await UsersRepository.getSelf());
    } catch (error) {
      commit(USER_ERROR);
      handleRequestError(error);
    }
  },

  [USER_PROFILE_UPDATE]: async ({ commit }, payload) => {
    commit(USER_PROFILE_UPDATE);
    try {
      const data = assign({}, state.profile, payload.data);

      const response = await UsersRepository.update(payload.id, data);
      const updatedData = { ...data, ...response.data.data };
      commit(USER_PROFILE_UPDATE_SUCCESS, updatedData);
      // commit(SALON_MANAGER_PROFILE_SET, updatedData);
    } catch (error) {
      commit(USER_PROFILE_UPDATE_ERROR);
      handleRequestError(error);
    }
  },
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = 'loading';
  },
  [USER_SUCCESS]: (state, response) => {
    const { data: user } = response.data;
    state.status = 'success';
    state.profile = user;
  },
  [USER_ERROR]: state => {
    state.status = 'error';
  },

  [AUTH_LOGOUT]: state => {
    state.profile = {};
  },
  [USER_PROFILE_UPDATE]: state => {
    state.status = 'loading';
  },
  [USER_PROFILE_UPDATE_SUCCESS]: (state, data) => {
    state.status = 'success';
    Vue.set(state, 'profile', data);
  },
  [USER_PROFILE_UPDATE_ERROR]: state => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
