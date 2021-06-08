import { RedisClient } from "redis";

export abstract class RedisClientAdapter {
  private tokenExpiryTime: number = 604800;
  protected client: RedisClient;

  constructor(client: RedisClient) {
    this.client = client;
  }

  /**
   * @method count
   * @public @async
   * @desc
   */

  public async count(key: string): Promise<number> {
    const allKeys = await this.getAllKeys(key);
    return allKeys.length;
  }

  /**
   * @method exist
   * @public
   * @desc
   */

  public exists(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return this.count(key)
        .then((count) => {
          return resolve(count >= 1 ? true : false);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  /**
   * @method getOne
   * @public
   * @desc
   */

  public getOne<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.hget(key, (error: Error, reply: unknown) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(<T>reply);
        }
      });
    });
  }
  /**
   * @method getAllKeys
   * @public
   * @desc
   */

  public getAllKeys(wildcard: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.client.keys(wildcard, async (error: Error, results: string[]) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      });
    });
  }

  /**
   * @method getAllKeyValue
   * @public
   * @desc
   */

  public getAllKeyValue(wildcard: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.client.keys(wildcard, async (error: Error, results: string[]) => {
        if (error) {
          return reject(error);
        } else {
          const allResults = await Promise.all(
            results.map(async (key) => {
              const value = await this.getOne(key);
              return { key, value };
            })
          );
          return resolve(allResults);
        }
      });
    });
  }

  /**
   * @method set
   * @public
   * @desc
   */

  public setOne(key: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.hset(key, value, (error, reply) => {
        if (error) {
          return reject(error);
        } else {
          this.client.expire(key, this.tokenExpiryTime);
          return resolve(reply);
        }
      });
    });
  }

  /**
   * @method deleteOne
   * @public
   * @desc
   */

  public deleteOne(key: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(reply);
        }
      });
    });
  }
}
