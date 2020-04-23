import {SchemaPropertiesCollection} from "./SchemaPropertiesCollection";
import {SchemaRequestType} from "./SchemaRequestType";
import {DataExtractedFromExpressRequestType} from "../ExtractData/DataExtractedFromExpressRequestType";
import {ExpressRequestType} from "../ExpressRequestType";

export class RequestSchema {

    private parameters: SchemaPropertiesCollection;
    private requestBody: object;

    public constructor(private schema: SchemaRequestType) {
        this.parameters = new SchemaPropertiesCollection();
        this.requestBody = schema.requestBody;
        this.parameters.buildFromList(schema.parameters);
    }

    public getRawSchema(): object {
        return this.schema;
    }

    public getParametersCollection(): SchemaPropertiesCollection {
        return this.parameters;
    }

    public getRequestBody(): object {
        return this.requestBody;
    }

    extractDataFromExpressRequest(expressRequest: ExpressRequestType): DataExtractedFromExpressRequestType {
        return this.parameters.extractDataFromExpressRequest(expressRequest);
    }

    getSchemaToValidateParameters() {
        return this.parameters.getSchemaToValidateParameters();
    }
}