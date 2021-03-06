import axios from 'axios';
import { serialize } from './util';

export const ROOT_URL = process.env.API_URL;
// export const ROOT_URL = process.env.API_URL_TEST;
export const { LOCALSTORAGE_TOKEN_NAME } = process.env;

export class Api {
  signup(formData) {
    return new Promise((resolve, reject) => {
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

  login(formData) {
    return new Promise((resolve, reject) => {
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

  logout() {
    return new Promise((resolve, reject) => {
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

  getProviders(options) {
    return new Promise((resolve, reject) => {
      // istanbul ignore next
      axios
        .get(
          `${ROOT_URL}/providers${options ? `?${serialize(options)}` : ''}`,
          {
            headers: {
              'x-auth': localStorage.getItem(LOCALSTORAGE_TOKEN_NAME) || ''
            }
          }
        )
        .then(res => resolve(res))
        .catch(
          // istanbul ignore next
          error => reject(error)
        );
    });
  }

  profile() {
    return new Promise((resolve, reject) => {
      // istanbul ignore next
      axios
        .get(`${ROOT_URL}/profile`, {
          headers: {
            'x-auth': localStorage.getItem(LOCALSTORAGE_TOKEN_NAME) || ''
          }
        })
        .then(res => resolve(res))
        .catch(
          // istanbul ignore next
          error => {
            reject(error);
          }
        );
    });
  }
}
