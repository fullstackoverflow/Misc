import { Core,symbolRoutePrefix } from './../core/core';

function MethodFactory(method:string,path:string):MethodDecorator{
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        Core.__DecoratedRouters.set(target[propertyKey],{
            target:target,
            path:path,
            method:method
        })
    }
}

export function Get(path:string):MethodDecorator {
    return MethodFactory('get',path);
}

export function Post(path:string):MethodDecorator {
    return MethodFactory('post',path);
}

export function Put(path:string):MethodDecorator {
    return MethodFactory('put',path);
}

export function Delete(path:string):MethodDecorator {
    return MethodFactory('delete',path);
}


