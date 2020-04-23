import {HttpException} from "./HttpException";
import {HTTP_CODES} from "../ControllerConsts";

export class InternalServerErrorHttpException extends HttpException{
    public constructor (message: string, protected errors: Array<object> = []) {
        super(HTTP_CODES.INTERNAL_SERVER_ERROR, message, errors);
    }
}