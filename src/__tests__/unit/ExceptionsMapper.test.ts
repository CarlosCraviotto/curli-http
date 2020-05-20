import chai = require('chai');
//import { ImportMock } from 'ts-mock-imports';

import {ExceptionsMapper} from '../../Exception/MapExceptions/ExceptionsMapper';
import {BadRequestHttpException} from "../../Exception";

let exceptionsMapper: ExceptionsMapper;

class Exception403Test extends Error {
};

class Exception400Test extends Error {
    getInvalidParams() {
        return [
            {
                "name": "age",
                "reason": "must be a positive integer"
            },
            {
                "name": "color",
                "reason": "must be green, red or blue"
            }
        ]
    }
};

describe('ExceptionsMapper class tests', function () {

    beforeEach(() => {
        exceptionsMapper = new ExceptionsMapper();
    });

    it('Should map an exception to 403', function () {
        exceptionsMapper.registerException('Exception403Test', 403);

        const exception = new Exception403Test('Invalid user.');
        const problemJsonResponse = exceptionsMapper.mapException(exception);

        chai.assert.deepEqual(403, problemJsonResponse.getCode());
        chai.assert.deepEqual(
            '{"type":"about:blank","status":403,"title":"Invalid user."}',
            problemJsonResponse.getContent()
        );

    });

    it('Should map an exception to 400 using getInvalidParams', function () {
        exceptionsMapper.registerException('Exception400Test', 400);

        const exception = new Exception400Test('Invalid user.');
        const problemJsonResponse = exceptionsMapper.mapException(exception);

        chai.assert.deepEqual(400, problemJsonResponse.getCode());
        chai.assert.deepEqual(
            '{"type":"about:blank","status":400,"title":"Invalid user.","invalid-params":[{"name":"age","reason":"must be a positive integer"},{"name":"color","reason":"must be green, red or blue"}]}',
            problemJsonResponse.getContent()
        );

    });

    it('Should map an exception to 500', function () {
        const problemJsonResponse = exceptionsMapper.mapException(new Error('Internal server error'));

        chai.assert.deepEqual(500, problemJsonResponse.getCode());
        chai.assert.deepEqual(
            '{"type":"about:blank","status":500,"title":"Internal server error"}',
            problemJsonResponse.getContent()
        );
    });

    it('Should map an exception to 400', function () {
        const problemJsonResponse = exceptionsMapper.mapException(new BadRequestHttpException('Internal server error'));

        chai.assert.deepEqual(400, problemJsonResponse.getCode());
        chai.assert.deepEqual(
            '{"type":"about:blank","status":400,"title":"Internal server error","invalid-params":[]}',
            problemJsonResponse.getContent()
        );
    });


    it('Should throw an error if we try to register same exception twice', function () {
        exceptionsMapper.registerException('Exception400Test', 400);
        chai.assert.throws(function () {
            exceptionsMapper.registerException('Exception400Test', 400);
        }, 'This exception class name (Exception400Test) is already registered');
    });

});
