import { find, findIndex } from 'lodash';
import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_REQUEST_SUCCESS,
  COMPANY_LIST_REQUEST_ERROR,
  COMPANY_CREATE,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_ERROR,
  COMPANY_UPDATE,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_ERROR,
  COMPANY_DELETE,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_ERROR,
} from '@/store/actions/company';
import { handleRequestError } from '@/utils/error';
import Repository, { COMPANY } from '@/repositories/RepositoryFactory';

const CompanyRepository = Repository.get(COMPANY);

const state = {
  status: '',
  companyListStatus: '',
  companyList: [],
  companyListMeta: {},
};

const getters = {
  companyStatus: state => state.status,
  companyListStatus: state => state.companyListStatus,
  companyList: state => state.companyList,
  companyListMeta: state => state.companyListMeta,
  getCompanyById: (state, getters) => id => {
    if (getters.companyList.length > 0) {
      return find(getters.companyList, { id });
    }
    return state.service;
  },
};

const actions = {
  [COMPANY_LIST_REQUEST]: async ({ commit }, payload) => {
    commit(COMPANY_LIST_REQUEST);
    try {
      const response = await CompanyRepository.get(payload);
      commit(COMPANY_LIST_REQUEST_SUCCESS, response.data);
    } catch (error) {
      commit(COMPANY_LIST_REQUEST_ERROR);
      handleRequestError(error);
    }
  },
  [COMPANY_CREATE]: async ({ commit }, payload) => {
    commit(COMPANY_CREATE);
    try {
      const response = await CompanyRepository.create(payload);
      commit(COMPANY_CREATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(COMPANY_CREATE_ERROR);
      handleRequestError(error);
    }
  },
  [COMPANY_UPDATE]: async ({ commit }, { id, data }) => {
    commit(COMPANY_UPDATE);
    try {
      const response = await CompanyRepository.update(id, data);
      commit(COMPANY_UPDATE_SUCCESS, response.data.data);
    } catch (error) {
      commit(COMPANY_UPDATE_ERROR);
      handleRequestError(error);
    }
  },
  [COMPANY_DELETE]: async ({ commit }, id) => {
    commit(COMPANY_DELETE);
    try {
      await CompanyRepository.delete(id);
      commit(COMPANY_DELETE_SUCCESS, id);
    } catch (error) {
      commit(COMPANY_DELETE_ERROR);
      handleRequestError(error);
    }
  },
};

const mutations = {
  [COMPANY_LIST_REQUEST]: state => {
    state.companyListStatus = 'loading';
  },
  [COMPANY_LIST_REQUEST_SUCCESS]: (state, payload) => {
    state.companyList = payload.data;
    state.companyListStatus = 'success';
    if (payload.meta) {
      state.companyListMeta = payload.meta;
    }
  },
  [COMPANY_LIST_REQUEST_ERROR]: state => {
    state.companyListStatus = 'error';
  },
  [COMPANY_CREATE]: state => {
    state.status = 'loading';
  },
  [COMPANY_CREATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.companyList.unshift(payload);
  },
  [COMPANY_CREATE_ERROR]: state => {
    state.status = 'error';
  },
  [COMPANY_UPDATE]: state => {
    state.status = 'loading';
  },
  [COMPANY_UPDATE_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.companyList = state.companyList.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  },
  [COMPANY_UPDATE_ERROR]: state => {
    state.status = 'error';
  },
  [COMPANY_DELETE]: state => {
    state.status = 'deleting';
  },
  [COMPANY_DELETE_SUCCESS]: (state, payload) => {
    state.status = 'deleted';
    const index = findIndex(state.companyList, { id: payload });
    state.companyList.splice(index, 1);
  },
  [COMPANY_LIST_REQUEST_ERROR]: state => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
