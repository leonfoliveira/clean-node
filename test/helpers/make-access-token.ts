import jwt from 'jsonwebtoken';
import { Collection } from 'mongodb';

import { env } from '@/main/config/env';
import { mockAccountModel } from '@/test/domain/mocks/models';

export const makeAccessToken = async (
  accountCollection: Collection,
  role = 'admin',
): Promise<string> => {
  const account = mockAccountModel();
  delete account.id;
  const id = (await accountCollection.insertOne({ ...account, role })).ops[0]._id;
  const accessToken = jwt.sign({ id }, env.jwtSecret);
  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } });
  return accessToken;
};
