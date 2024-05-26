import { Test, TestingModule } from '@nestjs/testing';
import { CohereAIApiController } from './cohere-api.controller';

describe('CohereAIApiController', () => {
  let controller: CohereAIApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohereAIApiController],
    }).compile();

    controller = module.get<CohereAIApiController>(CohereAIApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
