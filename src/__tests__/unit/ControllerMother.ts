import {DependencyInjection} from 'curli-types';
import {BaseController} from '../../BaseController';

interface ClassConstructorContainer  {
 new(c: DependencyInjection): any;
}

class ControllerTest extends BaseController {

    HTTP_METHOD = 'get';
    ROUTE = '/user';
    ROUTE_NAME = 'getUser';

    constructor (container: DependencyInjection) {
        super(container);
    }

    processRequest (): Promise<any> {
        return Promise.resolve('');
    }

}


class ControllerNotInitialized extends BaseController {

    ROUTE = '/user';
    ROUTE_NAME = 'getUser';

    constructor (container: DependencyInjection) {
        super(container);
    }

    processRequest (): Promise<any> {
        return Promise.resolve('');
    }

}

export const controllerMother = {

    getUserController (): ClassConstructorContainer  {
        return ControllerTest;
    },

    getControllerNotInitialized (): ClassConstructorContainer  {
        return ControllerNotInitialized;
    },

};
