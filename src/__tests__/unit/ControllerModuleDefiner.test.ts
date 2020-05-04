import chai = require('chai');
import {ControllerModuleDefiner} from '../../CurliModule/ControllerModuleDefiner';

import {
    CurliApplication,
    DependencyInjection,
    Module,
    DependencyInjectionMock,
    CurliApplicationMock
} from 'curli-types';

import {RouterService} from "../../RouterService";

let curliApplication: CurliApplication;
let contaniner: DependencyInjection;

describe('RouterModuleDefiner class tests', function () {

    beforeEach(() => {
        curliApplication = new CurliApplicationMock();
        contaniner = new DependencyInjectionMock();

        contaniner.get = ()=>{
            return new RouterService({}, contaniner);
        }

        curliApplication.setContainer(contaniner);
    });


    it('Should return the getName(), whenCallMethodInModules() and getMethodName()', function () {
        const routerModuleDefiner = new ControllerModuleDefiner(curliApplication);

        chai.assert.deepEqual('ControllerModuleDefiner', routerModuleDefiner.getName());
        chai.assert.deepEqual('before:start', routerModuleDefiner.whenCallMethodInModules());
        chai.assert.deepEqual('registerController', routerModuleDefiner.getMethodName());
    });


    it('Should call registerController into.', async function () {
        let wasCalled = false;

        const controllerModuleDefiner = new ControllerModuleDefiner(curliApplication);

        const module: Module = {
            registerController: (routerService: RouterService) => {
                wasCalled = true;
                chai.assert.deepEqual('RouterService', routerService.constructor.name);
            },
            getName(): string {
                return 'moduleMock';
            }
        };

        controllerModuleDefiner.beforeCallModules();
        controllerModuleDefiner.callMethodInModules(module);
        controllerModuleDefiner.afterCallModules();

        chai.assert.deepEqual(true, wasCalled);
    });
});
