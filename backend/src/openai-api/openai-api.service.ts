import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  GetOpenAIAnswerInputDTO,
  GetOpenAIAnswerOutputDTO,
} from './model/openai-answer.dto';

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

@Injectable()
export class OpenAIApiService {
  private readonly chat: ChatOpenAI;

  constructor() {
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }

  async getAIResponse(data: GetOpenAIAnswerInputDTO) {
    try {
      const result = await this.chat.invoke(data.message);

      const aiMessage = result.content.toString();

      return GetOpenAIAnswerOutputDTO.getInstance(aiMessage);
    } catch (error) {
      console.error('Error in OpenAIApiService.getAIResponse: ', error);
      throw error;
    }
  }
}
