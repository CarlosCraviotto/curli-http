import {RequestParseFrom} from "../../ControllerConsts";


export type SchemaPropertyType = {
    name: string;
    findIn: RequestParseFrom;
    [key: string]: any;
}
