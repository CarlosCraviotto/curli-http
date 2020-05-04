import {Error} from "./Error";
import {DTOType} from "../../Type";

export class DefaultContentProblemAdapter {
    public static adapt(error: Error, httpCode: number): DTOType {
        const errorContent: DTOType = {
            "type": "about:blank",
            "status": httpCode,
            "title": error.message,
            "detail": void(0)
        }

        if (typeof error.getInvalidParams === 'function') {
            errorContent["invalid-params"] = error.getInvalidParams();
        }

        return errorContent;
    }
}