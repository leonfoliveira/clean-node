import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
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
