export interface Controller<Request = Record<string, any>, Response = any> {
  handle: (request: Request) => Promise<Response>;
}
