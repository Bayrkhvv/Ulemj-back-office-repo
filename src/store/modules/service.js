import { find, findIndex } from 'lodash';
import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_REQUEST_ERROR,
  SERVICE_LIST_REQUEST_SUCCESS,
  SERVICE_CREATE,
  SERVICE_CREATE_SUCCESS,
  SERVICE_CREATE_ERROR,
  SERVICE_UPDATE,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_ERROR,
  SERVICE_DELETE,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_ERROR,
} from '@/store/actions/service';
import { handleRequestError } from '@/utils/error';
import Repository, { SERVICES } from '@/repositories/RepositoryFactory';

const ServiceRepository = Repository.get(SERVICES);

const state = {
  status: '',
  serviceList: [],
  serviceListMeta: {},
  serviceListStatus: '',
};

const getters = {
  serviceStatus: state => state.status,
  serviceList: state => state.serviceList,
  serviceListMeta: state => state.serviceListMeta,
  serviceListStatus: state => state.serviceListStatus,
  getServiceById: (state, getters) => id => {
    if (getters.serviceList.length > 0) {
      return find(getters.serviceList, { id });
    }
    return null;
  },
};

const actions = {
  [SERVICE_LIST_REQUEST]: async ({ commit }, payload) => {
    commit(SERVICE_LIST_REQUEST);
    try {
      const response = await ServiceRepository.get(payload);
      commit(SERVICE_LIST_REQUEST_SUCCESS, response.data);
    } catch (error) {
      commit(SERVICE_LIST_REQUEST_ERROR);
      handleRequestError(error);
    }
  },
  [SERVICE_CREATE]: async ({ commit }, payload) => {
    commit(SERVICE_CREATE);
    try {
      const response = await ServiceRepository.create(payload);
      commit(SERVICE_CREATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(SERVICE_CREATE_ERROR);
      handleRequestError(error);
    }
  },
  [SERVICE_UPDATE]: async ({ commit }, { id, data }) => {
    commit(SERVICE_UPDATE);
    try {
      const response = await ServiceRepository.update(id, data);
      commit(SERVICE_UPDATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(SERVICE_UPDATE_ERROR);
      handleRequestError(error);
    }
  },
  [SERVICE_DELETE]: async ({ commit }, id) => {
    commit(SERVICE_DELETE);
    try {
      await ServiceRepository.delete(id);
      commit(SERVICE_DELETE_SUCCESS, id);
    } catch (error) {
      commit(SERVICE_DELETE_ERROR);
      handleRequestError(error);
    }
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [SERVICE_LIST_REQUEST]: state => {
    state.serviceListStatus = 'loading';
  },
  [SERVICE_LIST_REQUEST_SUCCESS]: (state, payload) => {
    state.serviceListStatus = 'success';
    state.serviceList = payload.data;
    if (payload.meta) {
      state.serviceListMeta = payload.meta;
    }
  },
  [SERVICE_LIST_REQUEST_ERROR]: state => {
    state.serviceListStatus = 'error';
  },
  [SERVICE_CREATE]: state => {
    state.status = 'loading';
  },
  [SERVICE_CREATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.serviceList.unshift(payload);
  },
  [SERVICE_CREATE_ERROR]: state => {
    state.status = 'error';
  },
  [SERVICE_UPDATE]: state => {
    state.status = 'loading';
  },
  [SERVICE_UPDATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.serviceList = state.serviceList.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  },
  [SERVICE_UPDATE_ERROR]: state => {
    state.status = 'error';
  },
  [SERVICE_DELETE]: state => {
    state.status = 'deleting';
  },
  [SERVICE_DELETE_SUCCESS]: (state, payload) => {
    state.status = 'deleted';
    const index = findIndex(state.serviceList, { id: payload });
    state.serviceList.splice(index, 1);
  },
  [SERVICE_DELETE_ERROR]: state => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
