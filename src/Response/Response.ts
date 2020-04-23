type HeadersType = { [key: string]: string };

export class Response {

    protected headers: HeadersType = {};

    public constructor(protected code: number = 200, protected content?: any) {
    }

    public addHeader(key: string, value: string): void {
        this.headers[key] = value;
    }

    public getHeaders(): HeadersType {
        return this.headers;
    }

    public getContent(): any {
        return this.content;
    }

    public getCode(): number {
        return this.code;
    }

}