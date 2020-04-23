import {REQUEST_PARSE_FROM} from "../../ControllerConsts";
import {SchemaPropertyType} from "./SchemaPropertyType";

export const getParameterDescription = {

    getBodyString(
        name: string,
        required: boolean = false,
        description?: string
    ): SchemaPropertyType {
        return this.getString(REQUEST_PARSE_FROM.BODY, name, required, description);
    },

    getPathString(
        name: string,
        required: boolean = false,
        description?: string
    ): SchemaPropertyType {
        return this.getString(REQUEST_PARSE_FROM.PATH, name, required, description);
    },

    getString(
        findIn: string,
        name: string,
        required: boolean = false,
        description?: string
    ): SchemaPropertyType {
        return {
            findIn: findIn,
            name: name,
            schema: {
                type: 'string'
            },
            required: required,
            description: description
        }
    },


    getBodyBoolean(
        name: string,
        required: boolean = false,
        description?: string
    ): SchemaPropertyType {
        return this.getBoolean(REQUEST_PARSE_FROM.BODY, name, required, description);
    },

    getBoolean(
        findIn: string,
        name: string,
        required: boolean = false,
        description?: string
    ): SchemaPropertyType {
        return {
            findIn: findIn,
            name: name,
            schema: {
                type: 'boolean'
            },
            required: required,
            description: description
        }
    },
}