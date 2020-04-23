import {DependencyInjection} from 'curli-types';

class Container implements DependencyInjection{

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

    editRegisteredServiceDescriptions<T>(_serviceName: string, _callback: T): void {
    }

    registerExternalServicesRegister(_externalServicesRegister: any): void {
    }

    registerService<T extends {}>(
        _serviceName: string,
                                  _dependencies: Array<string>,
                                  _serviceFunc: T,
                                  _autoInit?: boolean,
        _injectDependencies?: object
    ): void {
    }

    removeRegisteredServiceDescriptions(_serviceName: string): void {
    }

}

export const containerMother = {
    get (): DependencyInjection {
        return new Container();
    },
};
