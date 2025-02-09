import { Consumer, Kafka } from 'kafkajs';

export class KafkaService {
  private consumer: Consumer;
  private readonly topic: string;

  constructor() {
    const { CLIENT_ID: clientId } = process.env;
    const { BROKER: broker } = process.env;
    const { GROUP_ID: groupId } = process.env;
    const { TOPIC: topic } = process.env;

    console.log(
      `instantiating the kafka client with the clientId of ${clientId}, the group id of ${groupId}, the topic of ${topic}, and the broker as ${broker}`,
    );

    if (!clientId) {
      throw new Error('no client id provided');
    }
    if (!broker) {
      throw new Error('no broker provided');
    }
    if (!groupId) {
      throw new Error('no groupId provided');
    }
    if (!topic) {
      throw new Error('no topic provided');
    }

    this.topic = topic;

    const kafka = new Kafka({
      clientId,
      brokers: [broker || ''],
    });
    this.consumer = kafka.consumer({ groupId });
  }

  public async consumeMessages(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(
          `a message was received from partition ${partition}, content: ${message?.value?.toString()}`,
        );
      },
    });
  }
}

async function bootstrap() {
  const kafkaService = new KafkaService();
  await kafkaService.consumeMessages();
}

bootstrap();
