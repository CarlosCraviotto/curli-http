import {HttpException} from './HttpException';
import {HttpCodes} from '../ControllerConsts';

export class BadRequestHttpException extends HttpException {

    public constructor (message: string, protected errors: Array<object> = []) {
        super(HttpCodes.BAD_REQUEST, message, errors);
    }

}
