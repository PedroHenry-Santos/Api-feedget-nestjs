import { ApiProperty } from '@nestjs/swagger';

export class SwaggerError {
  @ApiProperty({
    example: '675bb8fa-51b5-4ab9-8a22-d6cfc0c487ff',
    description: 'Unique identifier for the error.',
  })
  code: string;

  @ApiProperty({ example: 'Bad request!', description: 'Error message.' })
  message: string;

  @ApiProperty({
    example: '2021-12-13T10:57:39.703Z',
    description: 'Timestamp of the error.',
  })
  timestamp: Date;

  @ApiProperty({
    example: '/api/example/error',
    description: 'Path of the error.',
  })
  path: string;
}
