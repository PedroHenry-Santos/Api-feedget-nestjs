import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomResponse } from '../../swagger/decorators/api-response.decorator';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCustomResponse(HttpStatus.CREATED, undefined)
  @ApiCustomResponse(HttpStatus.BAD_REQUEST, undefined)
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
}
