import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ServerException } from '../../error-handler/errors/ServerException';

@Catch(ServerException)
export class ServerExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ServerExceptionFilter.name);

  catch(exception: ServerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message;

    this.logger.error(
      `An error occurred with the server: ${exception.message}`,
    )
    this.logger.debug(
      `Coming from ${request.ip} calling ${exception.stack}`,
      exception.description
    )

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message,
        timestamp: new Date().toISOString(),
      });
  }
}