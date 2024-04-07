import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIApiService } from './openai-api/openai-api.service';
import { OpenAIApiModule } from './openai-api/openai-api.module';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';

@Module({
  imports: [OpenAIApiModule],
  controllers: [AppController],
  providers: [AppService, OpenAIApiService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
