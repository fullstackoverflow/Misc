import Koa from "koa";
export declare class Test {
    /**
     * test describe
     */
    test: boolean;
    test2: string;
}
declare class FormFile {
    path: string;
}
export declare class Upload {
    file: FormFile;
}
export declare enum Code {
    basetest = 0,
    get = 1,
    formdata = 2,
    delete = 3,
    put = 4,
    validateerror = 5,
    beforealltest = 6
}
export default class Router {
    test: "test";
    staus(ctx: Koa.Context): Promise<void>;
    get(ctx: Koa.Context): Promise<void>;
    formdata(ctx: Koa.Context): Promise<void>;
    delete(ctx: Koa.Context): Promise<void>;
    put(ctx: Koa.Context): Promise<void>;
    validateerror(ctx: Koa.Context): Promise<void>;
    beforealltest(ctx: Koa.Context): Promise<void>;
}
export {};
