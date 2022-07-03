import { USER_TOKEN_KEY } from '@/config';

const fileClient = {
  fetchPDF(url) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/pdf');
    headers.append('Accept', 'application/pdf');
    headers.append('Authorization', `Bearer ${window.$cookies.get(USER_TOKEN_KEY)}`);

    const options = {
      method: 'GET',
      headers,
    };

    return fetch(`${process.env.VUE_APP_API_URL}/${url}`, options);
  },
  fetchCSV(url) {
    const headers = new Headers();
    headers.append('Content-Type', 'text/csv');
    headers.append('Accept', 'text/csv');
    headers.append('Authorization', `Bearer ${window.$cookies.get(USER_TOKEN_KEY)}`);

    const options = {
      method: 'GET',
      headers,
    };

    return fetch(`${process.env.VUE_APP_API_URL}/${url}`, options);
  },
};

export default fileClient;
