export type HttpRequest = {
  params?: Record<string, any>;
  headers?: Record<string, any>;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  body?: any;
};
