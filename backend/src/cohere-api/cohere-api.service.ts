import { Injectable } from '@nestjs/common';
import { Cohere } from '@langchain/cohere';
import { GetAIAnswerOutputDTO } from '../models/openai-answer.dto';

const COHERE_API_KEY = process.env.COHERE_API_KEY;

@Injectable()
export class CohereAIApiService {
  private readonly chat: Cohere;

  constructor() {
    this.chat = new Cohere({
      apiKey: COHERE_API_KEY,
    });
  }

  async getAIResponse(prompt: string) {
    try {
      const result = await this.chat.invoke(prompt);

      console.log('CohereAIApiService.getAIResponse: ', result);

      // const aiMessage = result;

      // return GetAIAnswerOutputDTO.getInstance(aiMessage);
    } catch (error) {
      console.error('Error in OpenAIApiService.getAIResponse: ', error);
      throw error;
    }
  }
}
