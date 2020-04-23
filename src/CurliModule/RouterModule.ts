import {RouterService} from '../RouterService';
import {RequestParsersBooter} from './RequestParsersBooter';
import {DependencyInjection, BooterRegister} from 'curli-types';

import {Module} from 'curli-types';

export class RouterModule implements Module {

    public constructor () {
    }

    public registerBooters(booterRegisterer: BooterRegister) {
        booterRegisterer.registerBooter(RequestParsersBooter);
    }

    public registerServices (container: DependencyInjection) {
        container.registerService(
            'router',
            ['@expressApp', 'container'],
            RouterService,
            true
        );
    }

    public getName (): string {
        return 'RouterModule';
    }

}
