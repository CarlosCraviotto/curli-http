import {DependencyInjection} from 'curli-types';

class Container {

    public get (name: string): any {
        return name;
    }

    public registerServiceBuilded<T> (_name: string, _service: T): void {
    }

    public callAllServicesWithAutoInit (): void {
    }

    public getServicesCollection (): Array<string> {
        return ['service'];
    }

}

export const containerMother = {
    get (): DependencyInjection {
        return new Container();
    },
};
