import { KafkaClient, Producer } from "kafka-node";
import { KafkaClientAdapter } from "../../../../shared/infra/streaming/kafka/KafkaClientAdapter";

export class KafkaStream extends KafkaClientAdapter {
  constructor(client: KafkaClient, producer: Producer) {
    super(client, producer);
  }
}
