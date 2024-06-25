import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CohereAIApiService } from './cohere-api.service';
import { GetAIAnswerInputDTO } from '../models/openai-answer.dto';
import {
  CSS_TO_TAILWIND_PROMPT,
  TAILWIND_TO_CSS_PROMPT,
} from './utils/prompts';

@Controller('cohere-api')
export class CohereAIApiController {
  constructor(private readonly service: CohereAIApiService) {}

  @Get('health')
  async healthCheck() {
    return 'OK';
  }

  @Post('css-to-tailwind')
  async cssToTailwind(
    @Body(new ValidationPipe({ transform: true }))
    data: GetAIAnswerInputDTO,
  ) {
    try {
      const prompt = CSS_TO_TAILWIND_PROMPT(data.message);

      return await this.service.getAIResponse(prompt);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('tailwind-to-css')
  async tailwindToCss(
    @Body(new ValidationPipe({ transform: true }))
    data: GetAIAnswerInputDTO,
  ) {
    try {
      const prompt = TAILWIND_TO_CSS_PROMPT(data.message);

      return await this.service.getAIResponse(prompt);
    } catch (e) {
      throw new Error(e);
    }
  }
}
