import chai = require('chai');
//import { ImportMock } from 'ts-mock-imports';

import {RequestSchema} from '../../Request/Schema/RequestSchema';
import {SchemaRequestType} from "../../Request";
//import {SchemaPropertyType} from "../../Request/Schema/SchemaPropertyType";

//let requestSchema: RequestSchema;

let requestSchemaConfig: SchemaRequestType = {
    parameters: [
        {name: 'name', findIn: 'body', required: true},
        {name: 'email', findIn: 'body'},
        {name: 'userId', findIn: 'path', required: true}
        ],
    requestBody: {}
};

describe('RequestSchema class tests', function () {

    it('Should extract data from request', function () {
        const requestSchema = new RequestSchema(requestSchemaConfig);
        const req = {
            body: {name: 'luis', email: 'luis@hojer.com'},
            path: {userId: 'asdr23afsfe-qwfs-4f43-sd4444'}
        };

        const data = requestSchema.extractDataFromExpressRequest(req);

        chai.assert.deepEqual('luis', data.name);
        chai.assert.deepEqual('luis@hojer.com', data.email);
        chai.assert.deepEqual('asdr23afsfe-qwfs-4f43-sd4444', data.userId);

    });


    it('Should generate a schema to validate parameters', function () {
        const requestSchema = new RequestSchema(requestSchemaConfig);
        const expecting = {
            "properties": {
                "email": {},
                "name": {},
                "userId": {}
            },
            "required": [
                "name",
                "userId"
            ],
            "type": "object"
        };

        const data = requestSchema.getSchemaToValidateParameters();
        chai.assert.deepEqual(expecting, data);
    });

//    it('Should throw an error if the RequestSchema', function () {
//        chai.assert.throws(function () {
//            RequestSchema.otherMehotd();
//        }, 'Unexpected end of JSON input');
//    });

});
