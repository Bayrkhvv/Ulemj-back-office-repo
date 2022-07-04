import Vue from 'vue';
import { find, findIndex } from 'lodash';
import { assign } from 'lodash';
import {
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  USER_PROFILE_UPDATE,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_ERROR,
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_REQUEST_ERROR,
  USER_LIST_REQUEST_SUCCESS,
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
} from '@/store/actions/user';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import { handleRequestError } from '@/utils/error';
import Repository, { USERS } from '@/repositories/RepositoryFactory';

const UsersRepository = Repository.get(USERS);

const state = {
  status: '',
  error: '',
  profile: {},
  userList: [],
  userListMeta: {},
  userListStatus: '',
};

const getters = {
  userStatus: state => state.status,
  isProfileLoaded: state => !!state.profile.email || !!state.profile.phone,
  me: state => state.profile,
  userList: state => state.userList,
  userListMeta: state => state.userListMeta,
  userListStatus: state => state.userListStatus,
  getUserById: (state, getters) => id => {
    if (getters.userList.length > 0) {
      return find(getters.userList, { id });
    }
    return null;
  },
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
  [USER_LIST_REQUEST]: async ({ commit }, payload) => {
    commit(USER_LIST_REQUEST);
    try {
      const response = await UsersRepository.get(payload);
      commit(USER_LIST_REQUEST_SUCCESS, response.data);
    } catch (error) {
      commit(USER_LIST_REQUEST_ERROR);
      handleRequestError(error);
    }
  },

  [USER_CREATE]: async ({ commit }, payload) => {
    commit(USER_CREATE);
    try {
      const response = await UsersRepository.create(payload);
      commit(USER_CREATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(USER_CREATE_ERROR);
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
    } catch (error) {
      commit(USER_PROFILE_UPDATE_ERROR);
      handleRequestError(error);
    }
  },
  [USER_DELETE]: async ({ commit }, id) => {
    commit(USER_DELETE);
    try {
      await UsersRepository.delete(id);
      commit(USER_DELETE_SUCCESS, id);
    } catch (error) {
      commit(USER_DELETE_ERROR);
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
  [USER_LIST_REQUEST]: state => {
    state.userListStatus = 'loading';
  },
  [USER_LIST_REQUEST_SUCCESS]: (state, payload) => {
    state.userListStatus = 'success';
    state.userList = payload.data;
    if (payload.meta) {
      state.userListMeta = payload.meta;
    }
  },
  [USER_LIST_REQUEST_ERROR]: state => {
    state.userListStatus = 'error';
  },
  [USER_CREATE]: state => {
    state.status = 'loading';
  },
  [USER_CREATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.userList.unshift(payload);
  },
  [USER_CREATE_ERROR]: state => {
    state.status = 'error';
  },
  [USER_PROFILE_UPDATE]: state => {
    state.status = 'loading';
  },
  [USER_PROFILE_UPDATE_SUCCESS]: (state, data) => {
    state.status = 'success';
    state.userList = state.userList.map(item => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    Vue.set(state, 'profile', data);
  },
  [USER_PROFILE_UPDATE_ERROR]: state => {
    state.status = 'error';
  },
  [USER_DELETE]: state => {
    state.status = 'deleting';
  },
  [USER_DELETE_SUCCESS]: (state, payload) => {
    state.status = 'deleted';
    const index = findIndex(state.userList, { id: payload });
    state.userList.splice(index, 1);
  },
  [USER_DELETE_ERROR]: state => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
