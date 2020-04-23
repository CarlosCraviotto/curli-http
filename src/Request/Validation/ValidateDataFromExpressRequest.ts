import * as Ajv from 'ajv';
import {ValidationRequestException} from './ValidationRequestException';

export class ValidateDataFromExpressRequest {

    public constructor (private toValidate: {}, private schema: object) {
        this.validate();
    }

    private validate (): void | never {
        const ajv = new Ajv({allErrors: true}); // options can be passed, e.g. {allErrors: true}
        const validate = ajv.compile(this.schema);
        const valid = validate(this.toValidate);
        if (!valid) {
            const errors: Array<object> = (Array.isArray(validate.errors)) ? validate.errors : [{}];
            throw new ValidationRequestException(errors, 'Error validating config schema');
        }
    }

    // private concatErrors(errors: Array<any>): string {
    //     let messageToReturn = '';
    //     errors.forEach((error: any, index: number) => {
    //         messageToReturn = messageToReturn + ((index >= 1) ? ' | ' : '') + error.message;
    //     });
    //     return messageToReturn;
    // }

}
