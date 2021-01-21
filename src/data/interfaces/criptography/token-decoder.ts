export interface TokenDecoder {
  decode: (accessToken: string) => Promise<string>;
}
