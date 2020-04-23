import {ExpressRequestType} from '../ExpressRequestType';
import {DataExtractedFromExpressRequestType} from '../ExtractData/DataExtractedFromExpressRequestType';
import {SchemeToValidateRequestType} from '../SchemeToValidateRequestType';

export class SchemaPropertyModel {

    public constructor (
        private name: string,
        private findIn: string,
        private position: number,
        private schema: object = {},
        private required: boolean = false,
        private description?: string
    ) {
    }

    getFindIn (): string {
        return this.findIn;
    }

    getName (): string {
        return this.name;
    }

    getPosition (): number {
        return this.position;
    }

    getSchema (): object {
        return this.schema;
    }

    getRequired (): boolean {
        return this.required;
    }

    getDescription (): string|undefined {
        return this.description;
    }

    extractDataFromExpressRequest (
        expressRequest: ExpressRequestType,
        data: DataExtractedFromExpressRequestType
    ): DataExtractedFromExpressRequestType {
        const findIn = this.findIn.toLowerCase();

        if (
            expressRequest.hasOwnProperty(findIn) &&
            typeof expressRequest[findIn] === 'object' &&
            expressRequest[findIn].hasOwnProperty(this.name)
        ) {
            data[this.name] = expressRequest[findIn][this.name];
        }

        return data;
    }

    // public getValidateSchemaForProperty(): object{
    //
    // }

    getSchemaToValidateParameter (data: SchemeToValidateRequestType) {
        data.properties[this.name] = this.schema;

        if (this.required) {
            data.required.push(this.name);
        }
        return data;
    }

}
