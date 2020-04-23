export class ResponseSchema {

    public constructor (private schema: object) {
    }

    public get (): object {
        return this.schema;
    }

}
