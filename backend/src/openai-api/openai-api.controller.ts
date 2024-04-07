import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OpenAIApiService } from './openai-api.service';
import { GetOpenAIAnswerInputDTO } from './model/openai-answer.dto';
import {
  CSS_TO_TAILWIND_PROMPT,
  TAILWIND_TO_CSS_PROMPT,
} from './utils/prompts';

@Controller('openai-api')
export class OpenAIApiController {
  constructor(private readonly service: OpenAIApiService) {}

  @Post('css-to-tailwind')
  async cssToTailwind(
    @Body(new ValidationPipe({ transform: true }))
    data: GetOpenAIAnswerInputDTO,
  ) {
    console.log('data: ', data);
    const prompt = CSS_TO_TAILWIND_PROMPT(data.message);
    return { prompt };
    return await this.service.getAIResponse(prompt);
  }

  @Post('tailwind-to-css')
  async tailwindToCss(
    @Body(new ValidationPipe({ transform: true }))
    data: GetOpenAIAnswerInputDTO,
  ) {
    const prompt = TAILWIND_TO_CSS_PROMPT(data.message);
    return { prompt };
    return this.service.getAIResponse(prompt);
  }
}
