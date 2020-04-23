import {Request} from './Request';
import {BaseController} from '../BaseController';
import {RequestSchema} from './Schema/RequestSchema';
import {SchemaRequestType} from './Schema/SchemaRequestType';
import {ExpressRequestType} from './ExpressRequestType';
import {ValidateDataFromExpressRequest} from './Validation/ValidateDataFromExpressRequest';
import {BadRequestHttpException} from '../Exception/BadRequestHttpException';
import {ValidationRequestException} from './Validation/ValidationRequestException';
import {DTOType} from '../Type/DTOType';

// import {ExtractDataFromExpressRequest} from "./ExtractDataFromExpressRequest";

export class RequestBuilder {

    public build (req: any, res: any, controller: BaseController): Request {
        const headers: object = this.getHeadersFromRequest(req);
        const commandDTO = this.processRequestAndGenerateCommandDTO(req, controller);
        const request = new Request(req, res, headers, commandDTO, req.user);

        return request;
    }

    private getHeadersFromRequest (req: any): object {
        let headers: object = {};
        if (req.hasOwnProperty('headers')) {
            headers = req.headers;
        }
        return headers;
    }

    private processRequestAndGenerateCommandDTO (
        req: ExpressRequestType,
        controller: BaseController
    ): object | undefined {

        const requestSchemaConfig: SchemaRequestType | undefined = controller.getRequestSchema();
        let dataFromRequest: object | undefined;

        if (this.isRequestSchema(requestSchemaConfig)) {
            const requestSchema = new RequestSchema(requestSchemaConfig);
            dataFromRequest = requestSchema.extractDataFromExpressRequest(req);

            this.validateDataFromRequest(dataFromRequest, requestSchema);

            dataFromRequest = this.createCommandFromDataRequest(dataFromRequest, controller);
        }

        return dataFromRequest;
    }

    /**
     * Fill up the command object from the controller
     * with the data from the request.
     *
     * @param dataFromRequest
     * @param controller
     */
    private createCommandFromDataRequest (
        dataFromRequest: DTOType,
        controller: BaseController
    ): DTOType {
        const objectCommand: DTOType | undefined = controller.getCommand();
        if (objectCommand) {
            for (const key in dataFromRequest) {
                objectCommand[key] = dataFromRequest[key];
            }
            dataFromRequest = objectCommand;
        }

        return dataFromRequest;
    }

    /**
     * Confirm this is a SchemaRequestType object
     * @param requestSchemaConfig
     */
    private isRequestSchema (
        requestSchemaConfig: SchemaRequestType | undefined
    ): requestSchemaConfig is SchemaRequestType {
        return (
            requestSchemaConfig &&
            typeof requestSchemaConfig === 'object' &&
            requestSchemaConfig.hasOwnProperty('parameters')
        ) ? true : false;
    }

    private validateDataFromRequest (data: object, requestSchema: RequestSchema): void | never {
        try {
            new ValidateDataFromExpressRequest(data, requestSchema.getSchemaToValidateParameters());
        } catch (e) {
            this.handleErrorFromValidationOfRequest(e);
        }
    }

    private handleErrorFromValidationOfRequest (e: Error) {
        if (e instanceof ValidationRequestException) {
            throw new BadRequestHttpException(e.message, e.getErrors());
        } else {
            throw new BadRequestHttpException(e.message);
        }
    }

}
