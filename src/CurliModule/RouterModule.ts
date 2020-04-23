import {RouterService} from '../RouterService';
import {DependencyInjection} from 'curli-types';

import {Module} from 'curli-types';

export class RouterModule implements Module {

    public constructor () {
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
