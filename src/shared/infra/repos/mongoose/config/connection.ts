import { mongoose } from "mongoose";
import { dbConfig } from "../../../../../../config/db";

const { username, password, database, host, dbUrl } = dbConfig;
const opts = {
  useNewUrlParser: true,
};
const connection = () => {
  if (process.env.NODE_ENV === "production") {
    return mongoose.connect(dbUrl, opts);
  } else {
    return mongoose.connect(dbUrl, opts);
  }
};

export { connection };
