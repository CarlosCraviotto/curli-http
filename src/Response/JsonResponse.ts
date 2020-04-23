import {Response} from "./Response";
import {ContentTypeEnum} from "../Type";
import {HeaderNameEnum} from "../Type";


export class JsonResponse extends Response{

    public constructor(code: number = 200, content?: object) {
        super(code, JSON.stringify(content));
        this.addHeader(HeaderNameEnum.ContentType, ContentTypeEnum.JSON);
    }

}