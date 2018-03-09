import { symbolConfig, Core } from './../core/core';

export function Restc(flag?: Boolean): ClassDecorator {
    return function (target: Function) {
        if (flag !== false) {
            if (!target.prototype[symbolConfig]) {
                target.prototype[symbolConfig] = {};
            }
            target.prototype[symbolConfig].restc = true;
        }
    }
}

export function restc(flag?: Boolean): MethodDecorator {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        if (flag !== false) {
            let config = Core.__DecoratedRouters.get(target[propertyKey]);
            Object.assign(config, { restc: true });
        }
    }
}

export function describe(data: string) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        let config = Core.__DecoratedRouters.get(target[propertyKey]);
        Object.assign(config, { describe: data });
    }
}