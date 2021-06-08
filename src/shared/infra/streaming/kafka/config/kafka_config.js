require("dotenv").config();
let kafkaConfig;
if (process.env.NODE_ENV === "production") {
  kafkaConfig = {
    host: process.env.KAFKA_PROD_HOST,
    port: process.env.KAFKA_PROD_PORT,
  };
} else {
  kafkaConfig = {
    host: process.env.KAFKA_DEV_HOST,
    port: process.env.KAFKA_DEV_PORT,
  };
}

module.exports = { kafkaConfig };
