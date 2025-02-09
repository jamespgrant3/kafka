import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ProducerRecord } from 'kafkajs';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post()
  addMessage(@Body() record: ProducerRecord): Promise<void> {
    console.log('producer got the record', record);
    return this.kafkaService.addMessage(record);
  }
}
