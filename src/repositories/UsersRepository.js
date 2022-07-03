import Client from '@/clients/apiClient';

const resource = '/users';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getSelf() {
    return Client.get(`${resource}/me`);
  },
  register(payload) {
    return Client.post('/register', payload);
  },
  update(id, payload) {
    return Client.put(`${resource}/${id}`, payload);
  },
  sendPasswordResetEmail(payload) {
    return Client.post(`password/email`, payload);
  },
  resetPassword(payload) {
    return Client.post(`password/reset`, payload);
  },
  confirmPhone(id, payload) {
    return Client.post(`${resource}/${id}/confirm-phone`, payload);
  },
};
