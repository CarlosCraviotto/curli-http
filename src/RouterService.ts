import {BaseController} from './BaseController';
import {Request} from './Request/Request';
import {HttpCodes, NOT_IMPLEMENTED} from './ControllerConsts';
import {RequestBuilder} from './Request/RequestBuilder';
//import {HttpException} from './Exception/HttpException';

import {DependencyInjection} from 'curli-types';

export class RouterService {

    private controllersCollection: Array<BaseController>;
    private requestBuilder: RequestBuilder;

    public constructor (private expressApp: {[key: string]: any}, private container: DependencyInjection) {
        this.controllersCollection = [];
        this.requestBuilder = new RequestBuilder();
    }

    /**
     * Create a instance of the controller class
     * and register it into the service.
     *
     * @param ControllerClass
     */
    public addControllerClass (ControllerClass: new (c: DependencyInjection) => any) {
        const controller = new ControllerClass(this.container);
        this.validateControllerObject(controller);
        this.controllersCollection.push(controller);
        this.bindController(controller);
    }

    private bindController (controller: BaseController) {
        const httpMethod = controller.getHttpMethodLowerCase();
        const route = controller.getRoute();
        const routeRoles: Array<string>|undefined = controller.getRoles();

        if (!routeRoles || !routeRoles.length) {
            this.expressApp[httpMethod](route, this.callController(controller));
        } else {
            this.expressApp[httpMethod](route, this.checkUserLogged(), this.callController(controller));
        }
    }

    /**
     * Build the object internal request and send it to the controller method.
     * @param controller
     */
    private callController (controller: BaseController): CallableFunction {
        return async (req: any, res: any) => {
            try {
                const request: Request = this.requestBuilder.build(req, res, controller);
                const response = await controller.processRequest(request);
                res.status(response.getCode()).set(response.getHeaders()).send(response.getContent());
            } catch (e) {
                this.sendError(e, res);
            }
        };
    }

    private checkUserLogged () {
        return async (req: any, res: any, next: () => void) => {
            try {
                if (req.user) {
                    next();
                } else {
                    res.status(HttpCodes.UNAUTHORIZED).set({}).send('Unauthorized to view this!');
                }
            } catch (e) {
                this.sendError(e, res);
            }
        };
    }

    private sendError (e: Error, res: any): void {
        if (e instanceof HttpException) {
            res.status(e.getHttpCode())
                .set()
                .send(e.toJson());
        } else {
            this.sendInternalError(e, res);
        }
    }

    private sendInternalError (e: Error, res: any): void {
        console.log(e);
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).set({}).send(e);
    }

    private validateControllerObject (controller: any): void | never {

        if (!(controller instanceof BaseController)) {
            throw new Error('This is not a controller that extends from the Controller class.');
        }

        if (
            controller.getRoute() === NOT_IMPLEMENTED ||
            controller.getRouteName() === NOT_IMPLEMENTED ||
            controller.getHttpMethod() === NOT_IMPLEMENTED
        ) {
            // console.log(controller);
            throw new Error('This controller doesn\'t implement all the properties.');
        }
    }

}
