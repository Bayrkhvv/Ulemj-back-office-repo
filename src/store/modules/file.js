import Vue from 'vue';
import {
  FILE_UPLOAD,
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_CLEAR,
} from '@/store/actions/file';
import { USER_TOKEN_KEY } from '@/config';
import { handleRequestError } from '@/utils/error';

const state = {
  fileUpload: {},
};

const getters = {
  getFileUpload: state => state.fileUpload,
};

const actions = {
  [FILE_UPLOAD]: async ({ commit }, file) => {
    commit(FILE_UPLOAD);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // TODO: Maybe use axios for upload files
      // @see https://github.com/axios/axios/issues/1569
      // const response = await api.post('/files',
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${window.$cookies.get(USER_TOKEN_KEY)}`);
      const response = await fetch(`${process.env.VUE_APP_API_URL}/files`, {
        method: 'POST',
        body: formData,
        headers,
      });

      commit(FILE_UPLOAD_SUCCESS, (await response.json()).data);
    } catch (error) {
      commit(FILE_UPLOAD_ERROR);
      handleRequestError(error);
    }
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [FILE_UPLOAD]: state => {
    Vue.set(state, 'fileUpload', {
      status: 'loading',
    });
  },
  [FILE_UPLOAD_SUCCESS]: (state, data) => {
    Vue.set(state, 'fileUpload', {
      status: 'success',
      item: data,
    });
  },
  [FILE_UPLOAD_ERROR]: state => {
    Vue.set(state, 'fileUpload', {
      status: 'error',
      item: null,
    });
  },
  [FILE_UPLOAD_CLEAR]: state => {
    Vue.set(state, 'fileUpload', {
      status: 'success',
      item: null,
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
