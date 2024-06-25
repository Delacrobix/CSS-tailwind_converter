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

  /**
   * Endpoint for health check.
   * @returns 'OK' if the server is running.
   */
  @Get('health')
  async healthCheck() {
    return 'OK';
  }

  /**
   * Endpoint for converting CSS to Tailwind CSS.
   * @param data - The input data containing the CSS code.
   * @returns The converted Tailwind CSS code.
   * @throws Error if an error occurs during the conversion process.
   */
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

  /**
   * Endpoint for converting Tailwind CSS to CSS.
   * @param data - The input data containing the Tailwind CSS code.
   * @returns The converted CSS code.
   * @throws Error if an error occurs during the conversion process.
   */
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
