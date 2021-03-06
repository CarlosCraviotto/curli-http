import {ROUTER_SERVICE_NAME} from './ModuleConst';
import {RouterService} from '../RouterService';
import {CurliApplication} from 'curli-types';

import {Module, ModulesDefiner, ApplicationEvents} from 'curli-types';

export class ControllerModuleDefiner implements ModulesDefiner {

    private routerService?: RouterService;

    public constructor (private app: CurliApplication) {
    }

    getName (): string {
        return 'ControllerModuleDefiner';
    }

    beforeCallModules (): void {
        this.routerService = (this.app.getContainer().get(ROUTER_SERVICE_NAME) as RouterService);
    }

    /**
     * This should return the name of the application event when we want to call the modules.
     */
    whenCallMethodInModules (): ApplicationEvents {
        return 'before:start';
    }

    getMethodName (): string {
        return 'registerController';
    }

    /**
     * The accept method in the visitor Pattern, here we know what to call
     * @param _module
     */
    callMethodInModules (module: Module): void {
        module.registerController((this.routerService as RouterService));
    }

    /**
     * We call it after we go through all the models
     */
    afterCallModules (): void {
    }

}
