import {HttpException} from './HttpException';
import {HttpCodes} from '../ControllerConsts';

export class InternalServerErrorHttpException extends HttpException {

    public constructor (message: string, protected errors: Array<object> = []) {
        super(HttpCodes.INTERNAL_SERVER_ERROR, message, errors);
    }

}
