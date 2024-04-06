import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIApiController } from './openai-api.controller';

describe('OpenAIApiController', () => {
  let controller: OpenAIApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenAIApiController],
    }).compile();

    controller = module.get<OpenAIApiController>(OpenAIApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
