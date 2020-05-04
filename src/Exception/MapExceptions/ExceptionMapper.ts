import {ExceptionProblemDetailAdapter} from "./ExceptionProblemDetailAdapter";
import {ProblemJsonResponse} from "../../Response/ProblemJsonResponse";
import {Error} from "./Error";
import {DTOType} from "../../Type";
import {DefaultContentProblemAdapter} from "./DefaultContentProblemAdapter";

export class ExceptionMapper {
    public constructor(
        private exceptionClassName: string,
        private httpCode: number,
        private adapter?: ExceptionProblemDetailAdapter
    ) {
    }

    isSameExceptionClassName(exceptionClassName: string): boolean {
        return this.exceptionClassName === exceptionClassName;
    }

    buildResponse(error: Error): ProblemJsonResponse {
        return new ProblemJsonResponse(this.httpCode, this.mapExceptionToContentProblem(error));
    }

    private mapExceptionToContentProblem(error: Error) {
        return (this.adapter)? this.adapter(error) : this.defaultContentProblemAdapter(error);
    }

    private defaultContentProblemAdapter(error: Error): DTOType {
        return DefaultContentProblemAdapter.adapt(error, this.httpCode);
    }
}