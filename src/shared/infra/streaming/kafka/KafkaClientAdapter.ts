import { KafkaClient, Producer } from "kafka-node";

export abstract class KafkaClientAdapter {
  protected client: KafkaClient;
  protected producer: Producer;
  constructor(client: KafkaClient, producer: Producer) {
    this.client = client;
    this.producer = producer;
  }
  public publish() {}
  public consumer() {}
}
