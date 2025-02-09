import { Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ProducerRecord } from 'kafkajs';

@Controller()
export class MessageController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post()
  async addMessage(record: ProducerRecord): Promise<void> {
    console.log('producer got the record', record);
    return await this.kafkaService.addMessage(record);
  }
}
