export type Error = {
    name: string;
    message: string;
    stack?: string;
    [key: string]: any
}