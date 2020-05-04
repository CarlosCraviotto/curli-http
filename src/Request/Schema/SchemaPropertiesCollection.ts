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

            this.collection.push(new SchemaPropertyModel(
                propertyData.name,
                propertyData.findIn,
                index,
                (propertyData.hasOwnProperty('schema')) ? propertyData.schema : void (0),
                (propertyData.hasOwnProperty('required')) ? propertyData.required : void (0),
                (propertyData.hasOwnProperty('schema')) ? propertyData.schema : void (0)
            ));
        });
    }

    public extractDataFromExpressRequest (
        expressRequest: ExpressRequestType
    ): DataExtractedFromExpressRequestType {

        let data: DataExtractedFromExpressRequestType = {};

        this.collection.forEach((schemaPropertyModel: SchemaPropertyModel) => {
            data = schemaPropertyModel.extractDataFromExpressRequest(expressRequest, data);
        });

        return data;
    }

    public getSchemaToValidateParameters () {
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
