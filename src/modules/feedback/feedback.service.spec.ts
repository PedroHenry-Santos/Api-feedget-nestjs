import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  let service: FeedbackService;
  const createFeedbackSpy = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({
        feedback: { create: createFeedbackSpy },
      })
      .compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to submit a feedback', async () => {
    await expect(
      service.create({
        type: 'bug',
        comment: 'I have a bug',
        screenshot: 'data:image/png;base64,dasdsadasd3e32eeewdasdas',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
  });
});
