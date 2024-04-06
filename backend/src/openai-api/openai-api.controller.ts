import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OpenAIApiService } from './openai-api.service';
import { GetOpenAIAnswerInputDTO } from './model/openai-answer.dto';

@Controller('openai-api')
export class OpenAIApiController {
  constructor(private readonly service: OpenAIApiService) {}

  @Post('message')
  async getAIResponse(
    @Body(new ValidationPipe({ transform: true }))
    data: GetOpenAIAnswerInputDTO,
  ) {
    return this.service.getAIResponse(data);
  }
}
