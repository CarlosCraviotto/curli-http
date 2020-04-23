import {RouterService} from '../RouterService';
import {DependencyInjection} from 'curli-types';

export class RouterModule {

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

}
