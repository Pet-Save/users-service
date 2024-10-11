import { Injectable } from '@nestjs/common';
import { ValidationException } from './errors/ValidationException';

@Injectable()
export class ErrorHandlerService {

    handleError(error: any): void {
        if (error instanceof ValidationException) throw new ValidationException(error.message, error.queryParams, error.description)
    }
}
