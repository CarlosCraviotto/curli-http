import {RouterService} from "../RouterService";

export class RouterModule {
    public constructor() {
    }

    public registerServices (container: {registerService: any}) {
        container.registerService(
            'router',
            ['@expressApp', 'container'],
            RouterService,
            true
        );
    }
}