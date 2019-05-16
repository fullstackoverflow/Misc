export declare class Type {
    static readonly ClassType: unique symbol;
    static readonly MethodType: unique symbol;
}
export declare class ClassDecoratorType {
    static readonly Controller: unique symbol;
    static readonly Schedule: unique symbol;
    static readonly Config: unique symbol;
    static readonly Component: unique symbol;
}
export declare enum MethodDecoratorType {
    Http = "Http"
}
export declare class ControllerType {
    static readonly PREFIX: unique symbol;
    static readonly PATH: unique symbol;
    static readonly METHOD: unique symbol;
}
export declare class ScheduleType {
    static readonly SCHEDULE: unique symbol;
}
export declare class ConfigType {
    static readonly ENV: unique symbol;
}
export declare enum Methods {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}
