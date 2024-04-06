import { Module } from '@nestjs/common';
import { OpenAIApiController } from './openai-api.controller';
import { OpenAIApiService } from './openai-api.service';

@Module({
  controllers: [OpenAIApiController],
  providers: [OpenAIApiService],
})
export class OpenAIApiModule {}
