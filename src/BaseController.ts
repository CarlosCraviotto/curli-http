import {NOT_IMPLEMENTED, DEFAULT_API_VERSION, DEFAULT_ROUTE_DESCRIPTION} from './ControllerConsts';
import {Response} from './Response/Response';
import {Request} from './Request/Request';
import {SchemaRequestType} from './Request/Schema/SchemaRequestType';
import {DTOType} from './Type/DTOType';

export class BaseController {

    /**
     * The route name, used to refer to it and build it.
     * Must be implemented.
     */
    public readonly ROUTE_NAME: string = NOT_IMPLEMENTED;

    /**
     * The route: /api/user/:id
     * Must be implemented.
     */
    public readonly ROUTE: string = NOT_IMPLEMENTED;

    /**
     * The http method of the route: GET, POST, PUT, DELETE, PATCH
     * Must be implemented.
     */
    public readonly HTTP_METHOD: string = NOT_IMPLEMENTED;

    public readonly API_VERSION: string = DEFAULT_API_VERSION;

    public readonly ROUTE_DESCRIPTION: string = DEFAULT_ROUTE_DESCRIPTION;

    public constructor (protected container: {get: any}) {
    }

    public async processRequest (request: Request): Promise<Response> {
        throw new Error('Method processRequest must be implemented in ' + this.ROUTE_NAME + ' controller.');
        console.log(request);
    }

    public getRouteName (): string {
        return this.ROUTE_NAME;
    }

    public getRoute (): string {
        return this.ROUTE;
    }

    public getHttpMethod (): string {
        return this.HTTP_METHOD;
    }

    public getHttpMethodLowerCase (): string {
        return this.HTTP_METHOD.toLowerCase();
    }

    public getApiVersion (): string {
        return this.API_VERSION;
    }

    public getRouteDescription (): string {
        return this.ROUTE_DESCRIPTION;
    }

    /**
     * We use it to validate, get the data and declare it in the open api page/
     */
    public getRequestSchema (): SchemaRequestType|undefined {
        return void(0);
    }

    /**
     * Should return the schema for the response, with it we wil build the open api page.
     */
    public getResponseSchema (): object|undefined {
        return void(0);
    }

    /**
     * Return an object than the router handle will fill up with the data from the request, all the properties must be public
     */
    public getCommand (): DTOType|undefined {
        return void(0);
    }

    /**
     * Return the roles we will accept for this route base in the user roles
     */
    public getRoles (): Array<string>|undefined {
        return void(0);
    }

}
