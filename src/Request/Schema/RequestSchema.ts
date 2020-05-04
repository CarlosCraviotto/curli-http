import {SchemaPropertiesCollection} from './SchemaPropertiesCollection';
import {SchemaRequestType} from './SchemaRequestType';
import {DataExtractedFromExpressRequestType} from '../ExtractData/DataExtractedFromExpressRequestType';
import {ExpressRequestType} from '../ExpressRequestType';

export class RequestSchema {

    private parameters: SchemaPropertiesCollection;
    private requestBody: object;

    public constructor (private schema: SchemaRequestType) {
        this.parameters = new SchemaPropertiesCollection();
        this.requestBody = this.schema.requestBody;
        this.parameters.buildFromList(this.schema.parameters);
    }

    public getRequestBody (): object {
        return this.requestBody;
    }

    /**
     * Extract the data from an express request as is
     * declared in the request schema
     *
     * @param {ExpressRequestType} expressRequest
     * @returns {object} A DTO object base in the properties are found.
     */
    public extractDataFromExpressRequest (
        expressRequest: ExpressRequestType
    ): DataExtractedFromExpressRequestType {
        return this.parameters.extractDataFromExpressRequest(expressRequest);
    }

    /**
     *
     * @returns {SchemeToValidateRequestType}
     */
    public getSchemaToValidateParameters () {
        return this.parameters.getSchemaToValidateParameters();
    }

}
