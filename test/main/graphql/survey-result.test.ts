import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import faker from 'faker';
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

describe('SurveyResultGraphQL', () => {
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

  describe('SurveyResult Query', () => {
    const surveyResultQuery = gql`
      query surveyResult($surveyId: String!) {
        surveyResult(surveyId: $surveyId) {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `;

    it('should return SurveyResult on success', async () => {
      const survey = mockSurveyEntity();
      const surveyId = (await surveyCollection.insertOne(survey)).ops[0]._id.toString();
      const accessToken = await makeAccessToken();
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: { headers: { 'x-access-token': accessToken } },
      });

      const result: any = await query(surveyResultQuery, { variables: { surveyId } });

      expect(result.data.surveyResult.question).toEqual(survey.question);
      expect(result.data.surveyResult.answers).toEqual(
        survey.answers.map((a: any) => ({
          answer: a.answer,
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: null,
        })),
      );
      expect(result.data.surveyResult.date).toBe(survey.date.toISOString());
    });

    it('should return AccessDeniedError if no token is provided', async () => {
      const { query } = createTestClient({
        apolloServer,
      });

      const result: any = await query(surveyResultQuery, {
        variables: { surveyId: faker.random.uuid() },
      });

      expect(result.data).toBeFalsy();
      expect(result.errors[0].message).toBe(new AccessDeniedError().message);
    });
  });

  describe('SaveSurveyResult Mutation', () => {
    const surveyResultMutation = gql`
      mutation saveSurveyResult($surveyId: String!, $answer: String!) {
        saveSurveyResult(surveyId: $surveyId, answer: $answer) {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `;

    it('should return a SurveyResult on success', async () => {
      const survey = mockSurveyEntity();
      const surveyId = (await surveyCollection.insertOne(survey)).ops[0]._id.toString();
      const accessToken = await makeAccessToken();
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: { headers: { 'x-access-token': accessToken } },
      });

      const result: any = await query(surveyResultMutation, {
        variables: { surveyId, answer: survey.answers[0].answer },
      });

      expect(result.data.saveSurveyResult.question).toEqual(survey.question);
      expect(result.data.saveSurveyResult.answers[0]).toEqual({
        answer: survey.answers[0].answer,
        count: 1,
        percent: 100,
        isCurrentAccountAnswer: true,
      });
      expect(result.data.saveSurveyResult.date).toBe(survey.date.toISOString());
    });

    it('should return AccessDeniedError if no token is provided', async () => {
      const { mutate } = createTestClient({
        apolloServer,
      });

      const result: any = await mutate(surveyResultMutation, {
        variables: {
          surveyId: faker.random.uuid(),
          answer: faker.random.uuid(),
        },
      });

      expect(result.data).toBeFalsy();
      expect(result.errors[0].message).toBe(new AccessDeniedError().message);
    });
  });
});
