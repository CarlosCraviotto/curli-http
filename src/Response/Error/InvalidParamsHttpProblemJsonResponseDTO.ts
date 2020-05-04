import {BaseHttpProblemJsonResponseDTO} from './BaseHttpProblemJsonResponseDTO';

type InvalidParam = {
    'name': string;
    'reason': string;
};

export class InvalidParamsHttpProblemJsonResponseDTO extends BaseHttpProblemJsonResponseDTO {

    public code = 400;
    public 'invalid-params': Array<InvalidParam>;

}
