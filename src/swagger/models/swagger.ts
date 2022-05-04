import { ApiProperty } from '@nestjs/swagger';

export class SwaggerError {
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
