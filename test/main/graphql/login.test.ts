import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import bcrypt from 'bcrypt';
import faker from 'faker';
import { Collection } from 'mongodb';

import { MongoHelper } from '@/infra';
import { EmailInUseError, UnauthorizedError } from '@/presentation/errors';
import { mockAccountEntity } from '@/test/infra/mocks';
import { mockSignupRequest } from '@/test/presentation/mocks';

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

    it('should UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer });

      const result: any = await query(loginQuery, {
        variables: {
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });

      expect(result.data).toBeFalsy();
      expect(result.errors[0].message).toBe(new UnauthorizedError().message);
    });
  });

  describe('SignUp Mutation', () => {
    const signUpMutation = gql`
      mutation signUp(
        $name: String!
        $email: String!
        $password: String!
        $passwordConfirmation: String!
      ) {
        signUp(
          name: $name
          email: $email
          password: $password
          passwordConfirmation: $passwordConfirmation
        ) {
          accessToken
          name
        }
      }
    `;

    it('should return an Authorization on valid data', async () => {
      const request = mockSignupRequest();
      const { mutate } = createTestClient({ apolloServer });

      const result: any = await mutate(signUpMutation, {
        variables: request,
      });

      expect(result.data.signUp.accessToken).toBeTruthy();
      expect(result.data.signUp.name).toBe(request.name);
    });

    it('should return EmailInUseError on invalid data', async () => {
      const request = mockSignupRequest();
      await accountCollection.insertOne({
        ...request,
        password: await bcrypt.hash(request.password, 12),
      });
      const { mutate } = createTestClient({ apolloServer });

      const result: any = await mutate(signUpMutation, {
        variables: request,
      });

      expect(result.data).toBeFalsy();
      expect(result.errors[0].message).toBe(new EmailInUseError().message);
    });
  });
});
