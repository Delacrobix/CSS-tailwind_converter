import { Test, TestingModule } from '@nestjs/testing';
import { CohereAIApiService } from './cohere-api.service';

describe('CohereAIApiService', () => {
  let service: CohereAIApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CohereAIApiService],
    }).compile();

    service = module.get<CohereAIApiService>(CohereAIApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
