export interface ControllerInterface {
    routeName: string;

    route: string;

    method: string;

    apiVersion?: string;

    routeParent?: string;

    processRequest <T>(): Promise<T>;

    getResponseHeaders? (): {[key: string]: any};

    getResponseSchema? (): {[key: string]: any};

    getRequestSchema? (): {[key: string]: any};

    getRequestCommandObject? (): object;
}
