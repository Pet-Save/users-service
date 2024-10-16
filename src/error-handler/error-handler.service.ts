import { Injectable } from '@nestjs/common';
import { ValidationException } from './errors/ValidationException';
import { ServerException } from './errors/ServerException';

@Injectable()
export class ErrorHandlerService {
    handleError(error: any): void {
        if (error instanceof ValidationException) throw new ValidationException(error.message, error.stack, error.queryParams, error.description)
        else if (error instanceof ServerException) throw new ServerException(error.message, error.stack, error.queryParams, error.description)
    }
}
