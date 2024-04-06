import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIApiService } from './openai-api.service';

describe('OpenAIApiService', () => {
  let service: OpenAIApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAIApiService],
    }).compile();

    service = module.get<OpenAIApiService>(OpenAIApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
