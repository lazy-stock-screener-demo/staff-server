import { KafkaClient, Producer } from "kafka-node";
import { promisify } from "util";
import { kafkaConfig } from "./kafka_config";

const host = kafkaConfig.host;
const port = kafkaConfig.port;
// const host = "localhost";
// const port = 9092;
const connectedKafkaClient = new KafkaClient({ kafkaHost: `${host}:${port}` });
const kafkaProducer = new Producer(connectedKafkaClient);
// const a0n = promisify(client.on).bind(client);

// const connectedKafkaClient = async () => {
//   await a0n.on("connect");
//   console.log(`[Kafka]: Connected to kafka server at ${host}:${port}`);
// };

export { connectedKafkaClient, kafkaProducer };
