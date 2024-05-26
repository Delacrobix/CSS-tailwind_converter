import { IsNotEmpty, IsString } from 'class-validator';

export class GetAIAnswerInputDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class GetAIAnswerOutputDTO {
  @IsString()
  @IsNotEmpty()
  aiMessage: string;

  static getInstance(aiMessage: string) {
    const dto = new GetAIAnswerOutputDTO();
    dto.aiMessage = aiMessage;
    return dto;
  }
}
