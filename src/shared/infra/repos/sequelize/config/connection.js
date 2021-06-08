require("dotenv").config();
const { Sequelize } = require("sequelize");
const { dbConfig } = require("./db_config");

const { username, password, database, host, port, db_url, dialect } = dbConfig;
const opts = {
  host,
  port,
  dialect,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: console.log,
};

let connectedClient;
if (process.env.NODE_ENV === "production") {
  console.log(
    `[DB]: Connecting to the database in ${process.env.NODE_ENV} mode.`
  );
  connectedClient = new Sequelize(db_url);
} else {
  console.log(
    `[DB]: Connecting to the database in ${process.env.NODE_ENV} mode.`
  );
  console.log(opts);
  connectedClient = new Sequelize(database, username, password, opts);
}

module.exports = {
  connectedClient,
};
