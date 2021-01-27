import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import bcrypt from 'bcrypt';
import { Collection } from 'mongodb';

import { MongoHelper } from '@/infra';
import { mockAccountEntity } from '@/test/infra/mocks';

import { makeApolloServer } from './helpers';

describe('LoginGraphQL', () => {
  let accountCollection: Collection;
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    apolloServer = makeApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `;

    it('should return an Authorization on valid credentials', async () => {
      const account = mockAccountEntity();
      await accountCollection.insertOne({
        ...account,
        password: await bcrypt.hash(account.password, 12),
      });
      const { query } = createTestClient({ apolloServer });

      const result: any = await query(loginQuery, {
        variables: {
          email: account.email,
          password: account.password,
        },
      });

      expect(result.data.login.accessToken).toBeTruthy();
      expect(result.data.login.name).toBe(account.name);
    });
  });
});
