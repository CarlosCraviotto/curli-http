import {Booter, CurliApplication} from 'curli-types';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export class RequestParsersBooter implements Booter {

    public constructor (protected app: CurliApplication) {
    }

    public boot (): void {
        this.app.setMiddleware(bodyParser.urlencoded({extended: true}));
        this.app.setMiddleware(bodyParser.json());
        this.app.setMiddleware(cors());
    }

}
