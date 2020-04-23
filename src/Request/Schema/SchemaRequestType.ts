import {SchemaPropertyType} from './SchemaPropertyType';

/**
 * Define the type of the configuration request
 */
export type SchemaRequestType = {
    parameters: Array<SchemaPropertyType>;
        requestBody: object;
}

