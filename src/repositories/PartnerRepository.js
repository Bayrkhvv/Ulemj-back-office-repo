import Client from '@/clients/apiClient';
import { stringify } from 'query-string';

const resource = 'partners';

export default {
  get(payload) {
    const params = Object.assign(
      {
        page: payload.page,
        limit: payload.limit || 10,
      },
      payload.filter
    );
    return Client.get(`${resource}?${stringify(params)}`);
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
