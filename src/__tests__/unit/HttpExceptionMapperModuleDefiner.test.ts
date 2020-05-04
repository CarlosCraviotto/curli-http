import chai = require('chai');
import {HttpExceptionMapperModuleDefiner} from '../../CurliModule/HttpExceptionMapperModuleDefiner';

import {
    CurliApplication,
    DependencyInjection,
    Module,
    DependencyInjectionMock,
    CurliApplicationMock
} from 'curli-types';

import {RouterService} from "../../RouterService";
import {ExceptionsMapper} from "../../Exception/MapExceptions/ExceptionsMapper";

let curliApplication: CurliApplication;
let contaniner: DependencyInjection;

describe('HttpExceptionMapperModuleDefiner class tests', function () {

    beforeEach(() => {
        curliApplication = new CurliApplicationMock();
        contaniner = new DependencyInjectionMock();

        contaniner.get = ()=>{
            return new RouterService({}, contaniner);
        }

        curliApplication.setContainer(contaniner);
    });


    it('Should return the getName(), whenCallMethodInModules() and getMethodName()', function () {
        const moduleDefiner = new HttpExceptionMapperModuleDefiner(curliApplication);

        chai.assert.deepEqual('HttpExceptionMapperModuleDefiner', moduleDefiner.getName());
        chai.assert.deepEqual('before:start', moduleDefiner.whenCallMethodInModules());
        chai.assert.deepEqual('registerHttpExceptionMapper', moduleDefiner.getMethodName());
    });


    it('Should call registerHttpExceptionMapper into.', async function () {
        let wasCalled = false;

        const moduleDefiner = new HttpExceptionMapperModuleDefiner(curliApplication);

        const module: Module = {
            registerHttpExceptionMapper: (exceptionsMapper: ExceptionsMapper) => {
                wasCalled = true;
                chai.assert.deepEqual('ExceptionsMapper', exceptionsMapper.constructor.name);
            },
            getName(): string {
                return 'moduleMock';
            }
        };

        moduleDefiner.beforeCallModules();
        moduleDefiner.callMethodInModules(module);
        moduleDefiner.afterCallModules();

        chai.assert.deepEqual(true, wasCalled);
    });
});
