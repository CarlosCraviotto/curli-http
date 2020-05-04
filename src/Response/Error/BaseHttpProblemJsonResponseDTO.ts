import {DTOType} from 'curli-types';

export class BaseHttpProblemJsonResponseDTO implements DTOType {

    public code = 500;
    public language = 'en';

    public type = '';
    public title = '';
    public detail?: string;
    public instance?: string;

}
