import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIApiService } from './openai-api/openai-api.service';
import { OpenAIApiModule } from './openai-api/openai-api.module';

@Module({
  imports: [OpenAIApiModule],
  controllers: [AppController],
  providers: [AppService, OpenAIApiService],
})
export class AppModule {}
