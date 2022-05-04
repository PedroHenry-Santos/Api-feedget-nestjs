import { ArgumentsHost, ConflictException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import { HttpExceptionFilter } from '../exception.filter';

const mock = jest.genMockFromModule<ArgumentsHost>('@nestjs/common');

describe('HttpExceptionFilter', () => {
  let httpExceptionFilter: HttpExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      imports: [],
      providers: [HttpExceptionFilter],
    })
      .overrideProvider(HttpAdapterHost)
      .useValue({
        httpAdapter: {
          setHeader: jest.fn(),
          reply: jest.fn(),
        },
      })
      .compile();

    httpExceptionFilter = app.get(HttpExceptionFilter);
  });

  it('should catch HTTP exception', () => {
    const error = new ConflictException('Test');

    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });

    httpExceptionFilter.catch(error, mock);
  });

  it('should catch HTTP exception where message being array of strings', () => {
    const error = new ConflictException(['Test_one', 'Test_two']);

    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });

    httpExceptionFilter.catch(error, mock);
  });

  it('should catch TypeORM exception with unauthenticated user', () => {
    const error = new Error('Test');

    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });

    httpExceptionFilter.catch(error, mock);
  });
});
