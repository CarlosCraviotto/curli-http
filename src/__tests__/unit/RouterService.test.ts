import chai = require('chai');

import {controllerMother} from './ControllerMother';
import {expressAppMother} from './ExpressAppMother';
import {RouterService} from '../../RouterService';
import {DependencyInjectionMock} from 'curli-types';

// let routerService: RouterService;

describe('Collections classes tests', function () {


    it('Should register a controller', function () {
        const expressApp = expressAppMother.get();

        expressApp.get = (route: string) => {
            chai.assert.deepEqual('/user', route);
        };

        const routerService = new RouterService(expressApp, new DependencyInjectionMock());
        const Controller = controllerMother.getUserController();
        routerService.addControllerClass(Controller);
    });

    it('Should throw exception when try to add a controller with not route declared.', function () {
        const expressApp = expressAppMother.get();

        const routerService = new RouterService(expressApp, new DependencyInjectionMock());
        const ControllerNotInitialized = controllerMother.getControllerNotInitialized();

        chai.assert.throws(function () {
            routerService.addControllerClass(ControllerNotInitialized);
        }, 'This controller doesn\'t implement all the properties.');
    });

});
