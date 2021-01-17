import { HashComparer } from '@/data/interfaces/criptography';

export class HashComparerStub implements HashComparer {
  response = true;

  async compare(): Promise<boolean> {
    return this.response;
  }
}
