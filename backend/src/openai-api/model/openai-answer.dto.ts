import { IsNotEmpty, IsString } from 'class-validator';

export class GetOpenAIAnswerInputDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class GetOpenAIAnswerOutputDTO {
  @IsString()
  @IsNotEmpty()
  aiMessage: string;

  static getInstance(aiMessage: string) {
    const dto = new GetOpenAIAnswerOutputDTO();
    dto.aiMessage = aiMessage;
    return dto;
  }
}
