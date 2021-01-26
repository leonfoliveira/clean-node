import faker from 'faker';
import { ObjectId } from 'mongodb';

export const mockSaveSurveyResultEntity = ({
  surveyId = new ObjectId(faker.random.uuid()),
  accountId = new ObjectId(faker.random.uuid()),
  answer = faker.random.words(),
}: {
  surveyId?: ObjectId;
  accountId?: ObjectId;
  answer?: string;
} = {}): Record<string, any> => ({
  surveyId,
  accountId,
  answer,
  date: faker.date.past(),
});
