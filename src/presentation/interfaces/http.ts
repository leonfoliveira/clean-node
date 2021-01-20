export type HttpRequest = {
  headers?: Record<string, any>;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  body?: any;
};
