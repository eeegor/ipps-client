import axios from 'axios';
import { Api, ROOT_URL } from './api';

const DUMMY_AUTH_TOKEN = 'TOKEN2393299283203932HJSKS';
const AUTH_HEADERS = { 'x-auth': DUMMY_AUTH_TOKEN };
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('async api signup actions', () => {
  it('tests a signup request', async () => {
    const requestPayload = {
      email: 'something@example.com',
      password: 'secret'
    };
    const responsePayload = {
      headers: AUTH_HEADERS,
      data: {
        id: '5c1828290d8dda46a20bc68b',
        email: 'something@example.com'
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(responsePayload));
    const api = new Api();
    const mockResponse = await api.signup(requestPayload);
    expect(mockResponse).toEqual(responsePayload);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${ROOT_URL}/signup`,
      requestPayload
    );
  });

  it('tests a failed signup request', async () => {
    const requestPayload = {
      email: 'something@example.com'
    };
    const responsePayload = {
      headers: {}
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(responsePayload));
    const api = new Api();
    const mockResponse = await api.signup(requestPayload);
    expect(mockResponse).toEqual(responsePayload);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});

describe('async api login actions', () => {
  it('tests a login request', async () => {
    const requestPayload = {
      email: 'something@example.com',
      password: 'secret'
    };
    const responsePayload = {
      headers: AUTH_HEADERS,
      data: {
        id: '5c1828290d8dda46a20bc68b',
        email: 'something@example.com'
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(responsePayload));
    const api = new Api();
    const mockResponse = await api.login(requestPayload);
    expect(mockResponse).toEqual(responsePayload);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${ROOT_URL}/login`,
      requestPayload
    );
  });

  it('tests a failed login request', async () => {
    const requestPayload = {
      email: 'something@example.com'
    };
    const responsePayload = {
      headers: {}
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(responsePayload));
    const api = new Api();
    const mockResponse = await api.login(requestPayload);
    expect(mockResponse).toEqual(responsePayload);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});

describe('async profile actions', () => {
  it('tests a profile request', async () => {
    const requestPayload = {
      headers: AUTH_HEADERS
    };
    const responsePayload = {
      headers: AUTH_HEADERS,
      data: {
        id: '5c1828290d8dda46a20bc68b',
        email: 'something@example.com'
      }
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(responsePayload));
    const api = new Api();
    const mockResponse = await api.profile(requestPayload);
    expect(mockResponse).toEqual(responsePayload);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

describe('async providers actions', () => {
  it('tests a get providers request', async () => {
    const requestPayload = {
      // eslint-disable-next-line no-useless-computed-key
      headers: { ['x-auth']: 'undefined' }
    };
    const responsePayload = {
      headers: AUTH_HEADERS,
      data: [
        { 'Provider Name': 'EXAMPLE 1', state: 'TX' },
        { 'Provider Name': 'EXAMPLE 2', state: 'TX' },
        { 'Provider Name': 'EXAMPLE 3', state: 'TX' }
      ]
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(responsePayload));
    const api = new Api();
    const mockResponse = await api.getProviders(requestPayload);
    expect(mockResponse).toEqual(responsePayload);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

describe('async logout actions', () => {
  it('tests a logout request', async () => {
    const requestPayload = {
      headers: { 'x-auth': 'undefined' }
    };
    const responsePayload = {
      headers: {},
      data: {}
    };
    axios.delete.mockImplementationOnce(() => Promise.resolve(responsePayload));
    const api = new Api();
    const mockResponse = await api.logout(requestPayload);
    expect(mockResponse).toEqual(responsePayload);
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      `${ROOT_URL}/logout`,
      requestPayload
    );
  });
});
