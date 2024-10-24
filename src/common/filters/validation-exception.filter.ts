import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '../../error-handler/errors/ValidationException';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message;

    this.logger.error(
      `An error occurred with client's input: ${exception.message}`,
    )
    this.logger.debug(
      `Coming from ${request.ip} calling ${exception.stack}`,
      exception.queryParams
    )

    response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        message,
        timestamp: new Date().toISOString(),
      });
  }
}