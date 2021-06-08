import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { toCamelCase } from "../helpers";
import { connectedClient } from "../config/connection";

const client: Sequelize = connectedClient as Sequelize;
let modelsLoaded: boolean = false;
let modelsCache: any = {};

class SequelizeModels {
  private models: any = {};
  private modelsList: any[];
  private constructor() {
    this.getModelList();
    this.getCamelCase();
  }
  public getModelList() {
    this.modelsList = fs
      .readdirSync(path.resolve(__dirname, "./"))
      .filter(
        (t) =>
          (~t.indexOf(".ts") || ~t.indexOf(".js")) &&
          !~t.indexOf("index") &&
          !~t.indexOf(".map")
      )
      .map((model) => {
        return require(__dirname + "/" + model).default(client, Sequelize);
      });
  }

  private getCamelCase() {
    for (let i = 0; i < this.modelsList.length; i++) {
      const modelName = toCamelCase(this.modelsList[i].name);
      this.models[modelName] = this.modelsList[i];
    }
  }

  public getModels() {
    const models = this.models;
    Object.keys(models).forEach((modelName) => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });
    models["sequelize"] = client;
    models["Sequelize"] = Sequelize;
    return models;
  }

  public static create() {
    if (modelsLoaded) {
      return modelsCache;
    } else {
      const models = new SequelizeModels();
      modelsCache = models.getModels();
      modelsLoaded = true;
      return modelsCache;
    }
  }
}
const createSequelizeModels = () => SequelizeModels.create();

export default createSequelizeModels();

export { createSequelizeModels };
