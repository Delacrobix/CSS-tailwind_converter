import { Module } from '@nestjs/common';
import { OpenAIApiController } from './openai-api.controller';

@Module({
  controllers: [OpenAIApiController],
})
export class OpenAIApiModule {}
