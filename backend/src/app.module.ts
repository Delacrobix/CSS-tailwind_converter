import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIApiService } from './openai-api/openai-api.service';
import { OpenAIApiModule } from './openai-api/openai-api.module';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';
import { RequestHistoryMiddleware } from './middleware/request-history.middleware';

@Module({
  imports: [OpenAIApiModule],
  controllers: [AppController],
  providers: [AppService, OpenAIApiService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
    consumer.apply(RequestHistoryMiddleware).forRoutes('*');
  }
}
