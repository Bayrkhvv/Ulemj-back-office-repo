import { find, findIndex } from 'lodash';
import {
  BANNER_LIST_REQUEST,
  BANNER_LIST_REQUEST_ERROR,
  BANNER_LIST_REQUEST_SUCCESS,
  BANNER_CREATE,
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_ERROR,
  BANNER_UPDATE,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_ERROR,
  BANNER_DELETE,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_ERROR,
} from '@/store/actions/banner';
import { handleRequestError } from '@/utils/error';
import Repository, { BANNERS } from '@/repositories/RepositoryFactory';

const BannerRepository = Repository.get(BANNERS);

const state = {
  status: '',
  bannerList: [],
  bannerListMeta: {},
  bannerListStatus: '',
};

const getters = {
  bannerStatus: state => state.status,
  bannerList: state => state.bannerList,
  bannerListMeta: state => state.bannerListMeta,
  bannerListStatus: state => state.bannerListStatus,
  getBannerById: (state, getters) => id => {
    if (getters.bannerList.length > 0) {
      return find(getters.bannerList, { id });
    }
    return null;
  },
};

const actions = {
  [BANNER_LIST_REQUEST]: async ({ commit }, payload) => {
    commit(BANNER_LIST_REQUEST);
    try {
      const response = await BannerRepository.get(payload);
      commit(BANNER_LIST_REQUEST_SUCCESS, response.data);
    } catch (error) {
      commit(BANNER_LIST_REQUEST_ERROR);
      handleRequestError(error);
    }
  },
  [BANNER_CREATE]: async ({ commit }, payload) => {
    commit(BANNER_CREATE);
    try {
      const response = await BannerRepository.create(payload);
      commit(BANNER_CREATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(BANNER_CREATE_ERROR);
      handleRequestError(error);
    }
  },
  [BANNER_UPDATE]: async ({ commit }, { id, data }) => {
    commit(BANNER_UPDATE);
    try {
      const response = await BannerRepository.update(id, data);
      commit(BANNER_UPDATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(BANNER_UPDATE_ERROR);
      handleRequestError(error);
    }
  },
  [BANNER_DELETE]: async ({ commit }, id) => {
    commit(BANNER_DELETE);
    try {
      await BannerRepository.delete(id);
      commit(BANNER_DELETE_SUCCESS, id);
    } catch (error) {
      commit(BANNER_DELETE_ERROR);
      handleRequestError(error);
    }
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [BANNER_LIST_REQUEST]: state => {
    state.bannerListStatus = 'loading';
  },
  [BANNER_LIST_REQUEST_SUCCESS]: (state, payload) => {
    state.bannerListStatus = 'success';
    state.bannerList = payload.data;
    if (payload.meta) {
      state.bannerListMeta = payload.meta;
    }
  },
  [BANNER_LIST_REQUEST_ERROR]: state => {
    state.bannerListStatus = 'error';
  },
  [BANNER_CREATE]: state => {
    state.status = 'loading';
  },
  [BANNER_CREATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.bannerList.unshift(payload);
  },
  [BANNER_CREATE_ERROR]: state => {
    state.status = 'error';
  },
  [BANNER_UPDATE]: state => {
    state.status = 'loading';
  },
  [BANNER_UPDATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.bannerList = state.bannerList.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  },
  [BANNER_UPDATE_ERROR]: state => {
    state.status = 'error';
  },
  [BANNER_DELETE]: state => {
    state.status = 'deleting';
  },
  [BANNER_DELETE_SUCCESS]: (state, payload) => {
    state.status = 'deleted';
    const index = findIndex(state.bannerList, { id: payload });
    state.bannerList.splice(index, 1);
  },
  [BANNER_DELETE_ERROR]: state => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
