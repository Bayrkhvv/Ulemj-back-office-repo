import { find, findIndex } from 'lodash';
import {
  PARTNER_LIST_REQUEST,
  PARTNER_LIST_REQUEST_ERROR,
  PARTNER_LIST_REQUEST_SUCCESS,
  PARTNER_CREATE,
  PARTNER_CREATE_SUCCESS,
  PARTNER_CREATE_ERROR,
  PARTNER_UPDATE,
  PARTNER_UPDATE_SUCCESS,
  PARTNER_UPDATE_ERROR,
  PARTNER_DELETE,
  PARTNER_DELETE_SUCCESS,
  PARTNER_DELETE_ERROR,
} from '@/store/actions/partner';
import { handleRequestError } from '@/utils/error';
import Repository, { PARTNERS } from '@/repositories/RepositoryFactory';

const BannerRepository = Repository.get(PARTNERS);

const state = {
  status: '',
  partnerList: [],
  partnerListMeta: {},
  partnerListStatus: '',
};

const getters = {
  partnerStatus: state => state.status,
  partnerList: state => state.partnerList,
  partnerListMeta: state => state.partnerListMeta,
  partnerListStatus: state => state.partnerListStatus,
  getPartnerById: (state, getters) => id => {
    if (getters.partnerList.length > 0) {
      return find(getters.partnerList, { id });
    }
    return null;
  },
};

const actions = {
  [PARTNER_LIST_REQUEST]: async ({ commit }, payload) => {
    commit(PARTNER_LIST_REQUEST);
    try {
      const response = await BannerRepository.get(payload);
      commit(PARTNER_LIST_REQUEST_SUCCESS, response.data);
    } catch (error) {
      commit(PARTNER_LIST_REQUEST_ERROR);
      handleRequestError(error);
    }
  },
  [PARTNER_CREATE]: async ({ commit }, payload) => {
    commit(PARTNER_CREATE);
    try {
      const response = await BannerRepository.create(payload);
      commit(PARTNER_CREATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(PARTNER_CREATE_ERROR);
      handleRequestError(error);
    }
  },
  [PARTNER_UPDATE]: async ({ commit }, { id, data }) => {
    commit(PARTNER_UPDATE);
    try {
      const response = await BannerRepository.update(id, data);
      commit(PARTNER_UPDATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(PARTNER_UPDATE_ERROR);
      handleRequestError(error);
    }
  },
  [PARTNER_DELETE]: async ({ commit }, id) => {
    commit(PARTNER_DELETE);
    try {
      await BannerRepository.delete(id);
      commit(PARTNER_DELETE_SUCCESS, id);
    } catch (error) {
      commit(PARTNER_DELETE_ERROR);
      handleRequestError(error);
    }
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [PARTNER_LIST_REQUEST]: state => {
    state.partnerListStatus = 'loading';
  },
  [PARTNER_LIST_REQUEST_SUCCESS]: (state, payload) => {
    state.partnerListStatus = 'success';
    state.partnerList = payload.data;
    if (payload.meta) {
      state.partnerListMeta = payload.meta;
    }
  },
  [PARTNER_LIST_REQUEST_ERROR]: state => {
    state.partnerListStatus = 'error';
  },
  [PARTNER_CREATE]: state => {
    state.status = 'loading';
  },
  [PARTNER_CREATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.partnerList.unshift(payload);
  },
  [PARTNER_CREATE_ERROR]: state => {
    state.status = 'error';
  },
  [PARTNER_UPDATE]: state => {
    state.status = 'loading';
  },
  [PARTNER_UPDATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.partnerList = state.partnerList.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  },
  [PARTNER_UPDATE_ERROR]: state => {
    state.status = 'error';
  },
  [PARTNER_DELETE]: state => {
    state.status = 'deleting';
  },
  [PARTNER_DELETE_SUCCESS]: (state, payload) => {
    state.status = 'deleted';
    const index = findIndex(state.partnerList, { id: payload });
    state.partnerList.splice(index, 1);
  },
  [PARTNER_DELETE_ERROR]: state => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
