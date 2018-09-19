export const Autowired = (params: any = ""): PropertyDecorator => {
    return (target: any, propertyKey: string) => {
        const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
        const originDescriptor = Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey);
        const descriptor = originDescriptor || { writable: true, configurable: true };
        descriptor.value = params ? new typeClass(params) : new typeClass();
        Reflect.defineProperty(
            (target && target.prototype) || target,
            propertyKey,
            descriptor
        );
    };
};