import { connection } from "../config/connection";

const connectedMongoose: any = connection;
let modelsLoaded: boolean = false;
let modelsCache: any = {};

class MongooseModels {
  public getModels() {
    return connectedMongoose;
  }
  public static create() {
    if (modelsLoaded) {
      return modelsCache;
    } else {
      const models = new MongooseModels();
      modelsCache = models.getModels();
      modelsLoaded = true;
      return modelsCache;
    }
  }
}

const createMongooseModels = () => MongooseModels.create();

export default createMongooseModels();

export { createMongooseModels };
