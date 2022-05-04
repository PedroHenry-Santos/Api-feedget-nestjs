import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ApiCustomResponse } from '../../swagger/decorators/api-response.decorator';
import { SendMailService } from '../send-mail/send-mail.service';
import { ApiAllModels } from '../../swagger/decorators/api-all-models.decorator';

@ApiTags('Feedback')
@Controller('feedback')
@ApiAllModels([])
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly sendMailService: SendMailService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCustomResponse(HttpStatus.CREATED)
  @ApiCustomResponse(HttpStatus.BAD_REQUEST)
  async create(@Body() { comment, type, screenshot }: CreateFeedbackDto) {
    const response = await this.feedbackService.create({
      comment,
      type,
      screenshot,
    });
    await this.sendMailService.sendMail({
      subject: 'Feedback do usuário',
      body: [
        `<div style="font-family: sans-serif; font-size= 16px; c olor=#111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });

    return response;
  }
}
