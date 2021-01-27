import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import jwt from 'jsonwebtoken';
import { Collection } from 'mongodb';

import { MongoHelper } from '@/infra';
import { env } from '@/main/config';
import { AccessDeniedError } from '@/presentation/errors';
import { mockAccountEntity, mockSurveyEntity } from '@/test/infra/mocks';

import { makeApolloServer } from './helpers';

let accountCollection: Collection;
let surveyCollection: Collection;
let apolloServer: ApolloServer;

const makeAccessToken = async (role?: string): Promise<string> => {
  const account = mockAccountEntity(role);
  const result = (await accountCollection.insertOne(account)).ops[0];

  const accessToken = jwt.sign({ id: result._id }, env.jwtSecret);
  await accountCollection.updateOne({ _id: result._id }, { $set: { accessToken } });
  return accessToken;
};

describe('SurveyGraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    surveyCollection = await MongoHelper.getCollection('surveys');
    await accountCollection.deleteMany({});
    await surveyCollection.deleteMany({});
  });

  describe('Surveys Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `;

    it('should return Surveys on success', async () => {
      const survey = mockSurveyEntity();
      await surveyCollection.insertOne(survey);
      const accessToken = await makeAccessToken();
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: { headers: { 'x-access-token': accessToken } },
      });

      const result: any = await query(surveysQuery);

      expect(result.data.surveys.length).toBe(1);
      expect(result.data.surveys[0].id).toBeTruthy();
      expect(result.data.surveys[0].question).toEqual(survey.question);
      expect(result.data.surveys[0].answers).toEqual(
        survey.answers.map((a: any) => ({ ...a, image: a.image ?? null })),
      );
      expect(result.data.surveys[0].date).toBe(survey.date.toISOString());
      expect(result.data.surveys[0].didAnswer).toBe(false);
    });

    it('should return AccessDeniedError if no token is provided', async () => {
      const { query } = createTestClient({
        apolloServer,
      });

      const result: any = await query(surveysQuery);

      expect(result.data).toBeFalsy();
      expect(result.errors[0].message).toBe(new AccessDeniedError().message);
    });
  });
});
