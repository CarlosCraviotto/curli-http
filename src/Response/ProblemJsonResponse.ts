import {Response} from './Response';
import {ContentTypeEnum} from '../Type';
import {HeaderNameEnum} from '../Type';

export class ProblemJsonResponse extends Response {

    public constructor (code = 500, content?: object) {
        super(code, JSON.stringify(content));
        this.addHeader(HeaderNameEnum.ContentType, ContentTypeEnum.PROBLEM_JSON);
    }

}
