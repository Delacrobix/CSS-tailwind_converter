import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OpenAIApiController } from './openai-api.controller';
import { OpenAIApiService } from './openai-api.service';
import { ApiKeyMiddleware } from 'src/middleware/api-key.middleware';
import { RequestHistoryMiddleware } from 'src/middleware/request-history.middleware';

@Module({
  imports: [OpenAIApiModule],
  controllers: [OpenAIApiController],
  providers: [OpenAIApiService],
})
export class OpenAIApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
    consumer.apply(RequestHistoryMiddleware).forRoutes('*');
  }
}
