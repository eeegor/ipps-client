import axios from 'axios';
import { getQuery } from './util';

export const ROOT_URL = 'https://ipps-api.now.sh';
// export const ROOT_URL = 'http://localhost:5000';
export const LOCALSTORAGE_TOKEN_NAME = 'ipps-api';

export class Api {
  async signup(formData) {
    return await new Promise((resolve, reject) => {
      axios
        .post(`${ROOT_URL}/signup`, formData)
        .then(res => {
          localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, res.headers['x-auth']);
          return resolve(res);
        })
        .catch(
          // istanbul ignore next
          error => reject(error)
        );
    });
  }

  async login(formData) {
    return await new Promise((resolve, reject) => {
      axios
        .post(`${ROOT_URL}/login`, formData)
        .then(res => {
          localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, res.headers['x-auth']);
          return resolve(res);
        })
        .catch(
          // istanbul ignore next
          error => reject(error)
        );
    });
  }

  async logout() {
    return await new Promise((resolve, reject) => {
      axios
        .delete(`${ROOT_URL}/logout`, {
          headers: {
            'x-auth': localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)
          }
        })
        .then(res => {
          localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME);
          return resolve(res);
        })
        .catch(
          // istanbul ignore next
          error => reject(error)
        );
    });
  }

  async getProviders() {
    return await new Promise((resolve, reject) => {
      // istanbul ignore next
      axios
        .get(`${ROOT_URL}/providers${getQuery() ? `?${getQuery()}` : ''}`, {
          headers: {
            'x-auth': localStorage.getItem(LOCALSTORAGE_TOKEN_NAME) || ''
          }
        })
        .then(res => {
          return resolve(res);
        })
        .catch(
          // istanbul ignore next
          error => reject(error)
        );
    });
  }

  async profile() {
    return await new Promise((resolve, reject) => {
      // istanbul ignore next
      axios
        .get(`${ROOT_URL}/profile`, {
          headers: {
            'x-auth': localStorage.getItem(LOCALSTORAGE_TOKEN_NAME) || ''
          }
        })
        .then(res => {
          return resolve(res);
        })
        .catch(
          // istanbul ignore next
          error => {
            reject(error);
          }
        );
    });
  }
}
