import { Core,symbolRoutePrefix } from './../core/core';

export function Get(path:string):MethodDecorator {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        Core.__DecoratedRouters.set(target[propertyKey],{
            target:target,
            path:path,
            method:'get'
        })
    }
}

export function Post(path:string):MethodDecorator {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        Core.__DecoratedRouters.set(target[propertyKey],{
            target:target,
            path:path,
            method:'post'
        })
    }
}

export function Put(path:string):MethodDecorator {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        Core.__DecoratedRouters.set(target[propertyKey],{
            target:target,
            path:path,
            method:'put'
        })
    }
}

export function Delete(path:string):MethodDecorator {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        Core.__DecoratedRouters.set(target[propertyKey],{
            target:target,
            path:path,
            method:'delete'
        })
    }
}


