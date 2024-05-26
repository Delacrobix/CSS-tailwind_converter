import { Module } from '@nestjs/common';
import { OpenAIApiModule } from './openai-api/openai-api.module';
import { CohereAIApiModule } from './cohere-api/cohere-api.module';

@Module({
  imports: [OpenAIApiModule, CohereAIApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
