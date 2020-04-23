import {ExpressRequestType} from './ExpressRequestType';
import {HEADER_NAMES} from '../ControllerConsts';
import {DTOType} from '../Type/DTOType';

export class Request {

    public constructor (
        private expressRequest: ExpressRequestType,
        private expressResponse: object,
        private headers: object,
        private command?: object,
        private user?: object
    ) {
    }

    public getExpressRequest (): ExpressRequestType {
        return this.expressRequest;
    }

    public getSameContentTypeThanRequestHeader (): object {
        const headers: DTOType = this.expressRequest.headers;
        const contentType: string | undefined = headers[HEADER_NAMES.CONTENT_TYPE];
        const headersNew: DTOType = {};

        if (contentType) {
            headersNew[HEADER_NAMES.CONTENT_TYPE] = contentType;
        }
        return headersNew;
    }

    public getExpressResponse (): object {
        return this.expressResponse;
    }

    public getHeaders (): object {
        return this.headers;
    }

    public getCommand (): object|undefined {
        return this.command;
    }

    public hasUser (): boolean {
        return (this.user) ? true : false;
    }

    public getUser (): object|undefined {
        return this.user;
    }

}
