import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../enum/type.enum';

export class CreateFeedbackDto {
  @ApiProperty({
    example: TypeEnum.BUG,
    enum: TypeEnum,
    description: 'Tipo do feedback',
  })
  @IsEnum(TypeEnum, { message: 'Tipo do feedback inválido' })
  type: string;

  @ApiProperty({
    example: 'Ocorreu um erro inesperado',
    description: 'Descrição do feedback',
  })
  @IsString({ message: 'A descrição precisa ser uma string' })
  comment: string;

  @ApiProperty({
    example: 'data:image/png;base64,....',
    description: 'Imagem do feedback',
  })
  @IsString({ message: 'A imagem precisa ser uma string' })
  @IsOptional()
  screenshot?: string;
}
