export class ServerException extends Error {
    queryParams: any
    description: any
    stack:any
    message : string
    constructor(message: string, stack: any, q: any, description?: string) {
        super(`An error occurred with the server: ${message}`);
        this.stack = stack;
        this.message = message;
        this.queryParams = q;
        this.description = description || message;
    }
}