import chai = require('chai');

import {controllerMother} from './ControllerMother';
import {expressAppMother} from './ExpressAppMother';
import {containerMother} from './ContainerMother';
import {RouterService} from '../../RouterService';

// let routerService: RouterService;

describe('Collections classes tests', function () {

    beforeEach(() => {

    });

    it('Should register a controller', function () {
        const expressApp = expressAppMother.get();

        expressApp.get = (route: string) => {
            console.log('Calling method -----------------');
            console.log(arguments);
            chai.assert.deepEqual('/user', route);
        };

        const routerService = new RouterService(expressApp, containerMother.get());
        const Controller = controllerMother.getUserController();
        routerService.addControllerClass(Controller);
    });

    it('Should throw exception when try to add a controller with not route declared.', function () {
        const expressApp = expressAppMother.get();

        const routerService = new RouterService(expressApp, containerMother.get());
        const ControllerNotInitialized = controllerMother.getControllerNotInitialized();

        chai.assert.throws(function () {
            routerService.addControllerClass(ControllerNotInitialized);
        }, 'This controller doesn\'t implement all the properties.');
    });

});
