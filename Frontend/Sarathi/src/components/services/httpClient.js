import axios from 'axios';

const httpClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
  validateStatus: () => true,
});

export function isCanceledRequest(error) {
  return axios.isCancel(error) || error?.code === 'ERR_CANCELED';
}

export function isTimedOutRequest(error) {
  return error?.code === 'ECONNABORTED' || error?.code === 'ETIMEDOUT';
}

export default httpClient;
