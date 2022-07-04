import Client from '@/clients/apiClient';

const resource = '/users';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getSelf() {
    return Client.get(`/me`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(id, payload) {
    return Client.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
};
