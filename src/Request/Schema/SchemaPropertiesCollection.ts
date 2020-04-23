import {SchemaPropertyModel} from './SchemaPropertyModel';
import {SchemaPropertyType} from './SchemaPropertyType';
import {DataExtractedFromExpressRequestType} from '../ExtractData/DataExtractedFromExpressRequestType';
import {ExpressRequestType} from '../ExpressRequestType';
import {SchemeToValidateRequestType} from '../SchemeToValidateRequestType';

export class SchemaPropertiesCollection {

    private collection: Array<SchemaPropertyModel>;

    constructor () {
        this.collection = [];
    }

    public buildFromList (list: Array<SchemaPropertyType>): void {
        list.forEach((propertyData: SchemaPropertyType, index: number) => {

            const name: string = propertyData.name;
            const findIn: string = propertyData.findIn;
            // private position: number,
            const schema: object | undefined = (propertyData.hasOwnProperty('schema')) ?
                propertyData.schema : void (0);

            const required: boolean | undefined = (propertyData.hasOwnProperty('required')) ?
                propertyData.required : void (0);

            const description: string | undefined = (propertyData.hasOwnProperty('schema')) ?
                propertyData.schema : void (0);

            this.collection.push(new SchemaPropertyModel(name, findIn, index, schema, required, description));
        });
    }

    extractDataFromExpressRequest (expressRequest: ExpressRequestType): DataExtractedFromExpressRequestType {
        let data: DataExtractedFromExpressRequestType = {};

        this.collection.forEach((schemaPropertyModel: SchemaPropertyModel) => {
            data = schemaPropertyModel.extractDataFromExpressRequest(expressRequest, data);
        });

        return data;
    }

    getSchemaToValidateParameters () {
        let data: SchemeToValidateRequestType = {};

        if (this.collection.length > 0) {
            data = {
                'type': 'object',
                'required': [],
                'properties': {},
            };

            this.collection.forEach((schemaPropertyModel: SchemaPropertyModel) => {
                data = schemaPropertyModel.getSchemaToValidateParameter(data);
            });
        }

        return data;
    }

}
