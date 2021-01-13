import { HttpResponse } from '@/presentation/protocols';

import { ServerError } from '../errors';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
