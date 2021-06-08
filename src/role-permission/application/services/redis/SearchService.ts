import { RedisClient } from "redis";
import { RedisClientAdapter } from "../../../../shared/application/services/redis/RedisClientAdapter";

export interface ISearchService {
  exists(id: any): Promise<boolean>;
  //   getUserByID(id: string): Promise<Staff>;
  //   save(id: string, user: Staff): Promise<void>;
}

export class SearchService
  extends RedisClientAdapter
  implements ISearchService {
  constructor(client: RedisClient) {
    super(client);
  }
}
