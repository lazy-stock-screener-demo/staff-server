require("dotenv").config();
let dbConfig;
if (process.env.NODE_ENV === "production") {
  dbConfig = {
    password: process.env.DB_PASS,
    database: process.env.POSTGRES_PROD_DB_NAME,
    host: process.env.DB_HOST,
    db_url: process.env.DB_URL,
  };
} else {
  dbConfig = {
    password: process.env.STAFF_DEV_PASSWORD,
    database: process.env.STAFF_DEV_DB_NAME,
    username: process.env.STAFF_DEV_USER,
    host: process.env.STAFF_DEV_HOST,
    port: process.env.STAFF_DEV_PORT,
    dialect: "postgres",
  };
  // dbConfig = {
  //   password: process.env.LICENSE_DEV_PASSWORD,
  //   database: process.env.LICENSE_DEV_DB_NAME,
  //   username: process.env.LICENSE_DEV_USER,
  //   host: process.env.LICENSE_DEV_HOST,
  //   port: process.env.LICENSE_DEV_PORT,
  //   dialect: "postgres",
  // };
}

module.exports = { dbConfig };
