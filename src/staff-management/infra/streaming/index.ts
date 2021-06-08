import {
  connectedKafkaClient,
  kafkaProducer,
} from "../../../shared/infra/streaming/kafka/config/kafkaConnection";
import { KafkaStream } from "./kafka/KafkaStream";

const streamingQueue = new KafkaStream(connectedKafkaClient, kafkaProducer);

export { streamingQueue };
