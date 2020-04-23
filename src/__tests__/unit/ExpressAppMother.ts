
const expressApp = {
    get(){},
    post(){},
    delete(){},
    put(){},
    patch(){}
};


export const expressAppMother  = {
    get(): {[key: string]: any}{
        return expressApp;
    }
}