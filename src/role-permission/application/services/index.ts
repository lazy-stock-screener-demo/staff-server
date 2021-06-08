import { connectedRedisClient } from "../../../shared/application/services/redis/config/redisConnection";
import { SearchService } from "./redis/SearchService";

const authService = new SearchService(connectedRedisClient());

export { authService };
