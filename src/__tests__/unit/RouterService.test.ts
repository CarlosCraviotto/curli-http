import chai = require('chai');

import {controllerMother} from './ControllerMother';
import {expressAppMother} from './ExpressAppMother';
import {containerMother} from './ContainerMother';
import {RouterService} from '../../RouterService';

//let routerService: RouterService;

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

    // it('Should add two services with same name in Collection servicesCollection', function () {
    //     const servicesCollection = getClassServicesCollection();
    //     const serviceName = 'foo';
    //
    //     servicesCollection.add(new ServiceNameDescriptionVO(serviceName), 'foo');
    //
    //     chai.assert.throws(function () {
    //         servicesCollection.add(new ServiceNameDescriptionVO(serviceName), 'foo');
    //     }, 'The service with name ' + serviceName + ' already exist.');
    // });

});
