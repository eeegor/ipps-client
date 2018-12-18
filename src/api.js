import axios from 'axios';
import { getQuery } from './util';

export const ROOT_URL = 'https://ipps-api.now.sh';
// export const ROOT_URL = 'http://localhost:5000';
export const LOCAL_X_AUTH_TOKEN = 'ipps-api';

export class Api {
  async signup(formData) {
    return await new Promise((resolve, reject) => {
      axios
        .post(`${ROOT_URL}/signup`, formData)
        .then(res => {
          localStorage.setItem(LOCAL_X_AUTH_TOKEN, res.headers['x-auth']);
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
          localStorage.setItem(LOCAL_X_AUTH_TOKEN, res.headers['x-auth']);
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
            'x-auth': localStorage.getItem(LOCAL_X_AUTH_TOKEN)
          }
        })
        .then(res => {
          localStorage.removeItem(LOCAL_X_AUTH_TOKEN);
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
            'x-auth': localStorage.getItem(LOCAL_X_AUTH_TOKEN) || ''
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
}
