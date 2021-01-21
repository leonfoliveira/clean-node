import supertest from 'supertest';

export const testInvalidParamResponse = (httpResponse: supertest.Response): void => {
  expect(httpResponse.status).toBe(400);
  expect(httpResponse.body.error).toMatch(/Invalid Param/);
};
