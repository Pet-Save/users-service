export class ValidationException extends Error {
    queryParams: any
    description: any
    stack:any
    message : string
    constructor(message: string, q: any, description?: string) {
        super(`An error occurred with client's input: ${message}`);
        this.message = message;
        this.queryParams = q;
        this.description = description || message;
    }
}