import redis, { Redis } from "redis";
import { promisify } from "util";
import { hostConfig } from "../../../../../../config";

const port = hostConfig.redisPort;
const host = hostConfig.redisHost;
const client: Redis = redis.createClient({
  port,
  host,
  retry_strategy: () => 1000,
});
const aOn = promisify(client.on).bind(client);
const connectedRedisClient = async () => {
  const instance = await aOn("connect");
  console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
  return instance;
};
export { connectedRedisClient };
