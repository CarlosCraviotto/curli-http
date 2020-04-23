export class ValidationRequestException extends Error {

    public constructor (protected errors: Array<object>, message: string) {
        super(message);
    }

    public getErrors (): Array<object> {
        return this.errors;
    }

}
