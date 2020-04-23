import {DependencyInjection} from 'curli-types';
import {BaseController} from '../../BaseController';

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

export const controllerMother = {
    getUserController (): { new(c: DependencyInjection): any } {
        return ControllerTest;
    },
};
