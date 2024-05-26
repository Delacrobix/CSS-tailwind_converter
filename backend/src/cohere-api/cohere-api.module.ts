import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CohereAIApiController } from './cohere-api.controller';
import { CohereAIApiService } from './cohere-api.service';
import { ApiKeyMiddleware } from 'src/middleware/api-key.middleware';
import { RequestHistoryMiddleware } from 'src/middleware/request-history.middleware';

@Module({
  imports: [CohereAIApiModule],
  controllers: [CohereAIApiController],
  providers: [CohereAIApiService],
})
export class CohereAIApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
    consumer.apply(RequestHistoryMiddleware).forRoutes('*');
  }
}
