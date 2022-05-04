import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomResponse } from '../../swagger/decorators/api-response.decorator';
import { SendMailService } from '../send-mail/send-mail.service';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly sendMailService: SendMailService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCustomResponse(HttpStatus.CREATED, undefined)
  @ApiCustomResponse(HttpStatus.BAD_REQUEST, undefined)
  async create(@Body() { comment, type, screenshot }: CreateFeedbackDto) {
    await this.feedbackService.create({ comment, type, screenshot });
    await this.sendMailService.sendMail({
      subject: 'Feedback do usuário',
      body: [
        `<div style="font-family: sans-serif; font-size= 16px; c olor=#111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}
