import {REQUEST_PARSE_FROM, RequestParseFrom} from '../../ControllerConsts';
import {SchemaPropertyType} from './SchemaPropertyType';

export const getParameterDescription = {

    getBodyString (
        name: string,
        required = false,
        description?: string
    ): SchemaPropertyType {
        return this.getString(REQUEST_PARSE_FROM.BODY, name, required, description);
    },

    getPathString (
        name: string,
        required = false,
        description?: string
    ): SchemaPropertyType {
        return this.getString(REQUEST_PARSE_FROM.PATH, name, required, description);
    },

    getString (
        findIn: RequestParseFrom,
        name: string,
        required = false,
        description?: string
    ): SchemaPropertyType {
        return {
            findIn: findIn,
            name: name,
            schema: {
                type: 'string',
            },
            required: required,
            description: description,
        };
    },

    getBodyBoolean (
        name: string,
        required = false,
        description?: string
    ): SchemaPropertyType {
        return this.getBoolean(REQUEST_PARSE_FROM.BODY, name, required, description);
    },

    getBoolean (
        findIn: RequestParseFrom,
        name: string,
        required = false,
        description?: string
    ): SchemaPropertyType {
        return {
            findIn: findIn,
            name: name,
            schema: {
                type: 'boolean',
            },
            required: required,
            description: description,
        };
    },
};
