import {ROUTER_SERVICE_NAME} from './ModuleConst';
import {RouterService} from '../RouterService';
import {CurliApplication} from 'curli-types';

import {Module, ModulesDefiner, ApplicationEvents} from 'curli-types';
import {ExceptionsMapper} from "../Exception/MapExceptions/ExceptionsMapper";

export class HttpExceptionMapperModuleDefiner implements ModulesDefiner {

    private exceptionsMapper?: ExceptionsMapper;

    public constructor (private app: CurliApplication) {
    }

    getName (): string {
        return 'HttpExceptionMapperModuleDefiner';
    }

    beforeCallModules (): void {
        const routerService = (this.app.getContainer().get(ROUTER_SERVICE_NAME) as RouterService);
        this.exceptionsMapper = routerService.getExceptionsMapper();
    }

    /**
     * This should return the name of the application event when we want to call the modules.
     */
    whenCallMethodInModules (): ApplicationEvents {
        return 'before:start';
    }

    getMethodName (): string {
        return 'registerHttpExceptionMapper';
    }

    /**
     * The accept method in the visitor Pattern, here we know what to call
     * @param _module
     */
    callMethodInModules (module: Module): void {
        module.registerHttpExceptionMapper((this.exceptionsMapper as ExceptionsMapper));
    }

    /**
     * We call it after we go through all the models
     */
    afterCallModules (): void {
    }

}
