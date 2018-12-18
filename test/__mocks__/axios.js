module.exports = {
  get: jest.fn(requestData => Promise.resolve(requestData)),
  post: jest.fn(requestData => Promise.resolve(requestData)),
  delete: jest.fn(() => {})
};
