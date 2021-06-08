import { connectedRedisClient } from "../../../shared/application/services/redis/config/redisConnection";

const authService = new SearchService(connectedRedisClient());

export { authService };
