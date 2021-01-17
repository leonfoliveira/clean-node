export interface UpdateAccessTokenRepository {
  update: (accessToken: string) => Promise<void>;
}
