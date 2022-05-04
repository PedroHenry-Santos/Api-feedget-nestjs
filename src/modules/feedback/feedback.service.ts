import { Injectable } from '@nestjs/common';

import { NestBodyResponse } from '../../core/http/nest-body-response';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    await this.prisma.feedback.create({ data: createFeedbackDto });

    return new NestBodyResponse().json(null);
  }
}
