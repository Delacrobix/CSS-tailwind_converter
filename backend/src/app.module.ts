import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatCompletionApiService } from './openai-api/openai-api.service';
import { ChatCompletionApiModule } from './openai-api/openai-api.module';

@Module({
  imports: [ChatCompletionApiModule],
  controllers: [AppController],
  providers: [AppService, ChatCompletionApiService],
})
export class AppModule {}
