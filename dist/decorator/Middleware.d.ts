import compose from "koa-compose";
export declare function Before<T>(...func: Array<compose.Middleware<T>>): (target: any, key: string, descriptor: PropertyDescriptor) => void;
export declare function After<T>(...func: Array<compose.Middleware<T>>): (target: any, key: string, descriptor: PropertyDescriptor) => void;
