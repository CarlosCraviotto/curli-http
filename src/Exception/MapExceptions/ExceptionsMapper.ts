import {ExceptionMapper} from "./ExceptionMapper";
import {ExceptionProblemDetailAdapter} from "./ExceptionProblemDetailAdapter";
import {ProblemJsonResponse} from "../../Response/ProblemJsonResponse";
import {Error} from "./Error";

const DEFAULT_EXCEPTION_CODE = 500;


export class ExceptionsMapper {

    private exceptionMapsCollection: ExceptionMapper[];

    public constructor() {
        this.exceptionMapsCollection = [];
    }

    public registerException(
        exceptionClassName: string,
        httpCode: number,
        adapter?: ExceptionProblemDetailAdapter
    ) {

        if (this.findExceptionMapper(exceptionClassName)) {
            const error = 'This exception class name (' + exceptionClassName + ') is already registered';
            throw new Error(error);
        }

        const mapException = new ExceptionMapper(exceptionClassName, httpCode, adapter);
        this.exceptionMapsCollection.push(mapException)
    }

    public mapException(error: Error): ProblemJsonResponse {
        let exceptionMapper = this.findExceptionMapper(error.constructor.name);

        if (!exceptionMapper) {
            exceptionMapper = this.buildDefaultExceptionMapper(error);
        }

        return exceptionMapper.buildResponse(error);
    }

    public findExceptionMapper(exceptionClassName: string): ExceptionMapper | undefined {
        return this.exceptionMapsCollection.find((mapException: ExceptionMapper) => {
            return mapException.isSameExceptionClassName(exceptionClassName);
        })
    }

    private buildDefaultExceptionMapper(error: Error): ExceptionMapper {
        return new ExceptionMapper(error.constructor.name, DEFAULT_EXCEPTION_CODE);
    }
}