import { Injectable } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService {
  private producer: Producer;

  constructor() {
    const { BROKER: broker } = process.env;

    console.log(
      `instantiating the kafka producer with the broker as ${broker || ''}`,
    );

    if (!broker) {
      throw new Error('no broker provided');
    }

    const kafka = new Kafka({
      brokers: [broker],
    });
    this.producer = kafka.producer();
  }

  public async addMessage(record: ProducerRecord): Promise<void> {
    await this.producer.connect();
    await this.producer.send(record);
    return this.producer.disconnect();
  }
}
