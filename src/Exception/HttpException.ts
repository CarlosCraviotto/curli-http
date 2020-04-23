export class HttpException extends Error{

    public constructor(private httpCode: number, message: string, protected errors: Array<object> = []) {
        super(message);
    }

    public getHttpCode (): number {
        return this.httpCode;
    }

    public toJson (): object {
        return {error: this.message, errors: this.errors};
    }

}