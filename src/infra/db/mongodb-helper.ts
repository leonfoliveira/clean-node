/* eslint-disable no-underscore-dangle */
import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect(url: string): Promise<void> {
    this.url = url;
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected) await this.connect(this.url);
    return this.client.db().collection(name);
  },

  mapId(data: any): any {
    const mappedData = {
      ...data,
      id: data._id,
    };
    delete mappedData._id;

    return mappedData;
  },
};
/* eslint-enable no-underscore-dangle */
