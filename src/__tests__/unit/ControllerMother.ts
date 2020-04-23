import {DependencyInjection} from "curli-types";
import {BaseController} from "../../BaseController";

class ControllerTest extends BaseController {
    HTTP_METHOD: string = 'get';
    ROUTE: string = '/user';
    ROUTE_NAME: string = 'getUser';

    constructor(container: DependencyInjection){
        super(container);
    }

    processRequest(): Promise<any> {
        return Promise.resolve('');
    }

};


export const controllerMother = {
    getUserController(): { new(c: DependencyInjection): any } {
        return ControllerTest;
    }
}