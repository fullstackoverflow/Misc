/// <reference types="koa-session" />
import Koa from "koa";
import { TestService } from "../service/TestService";
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
export default class Router {
    value_test: string;
    TestService: TestService;
    test: "test";
    staus(ctx: Koa.Context): Promise<void>;
    formdata(ctx: Koa.Context): Promise<void>;
    autowired(ctx: Koa.Context): Promise<void>;
    value(ctx: Koa.Context): Promise<void>;
    get(ctx: Koa.Context): Promise<void>;
    delete(ctx: Koa.Context): Promise<void>;
    put(ctx: Koa.Context): Promise<void>;
    /**
     * @api {post} /basetest basetest
     * @apiGroup test
     * @apiName basetest
     * @apiParamClass (test/router/router.ts) {Test}
     */
    validate(ctx: Koa.Context): Promise<void>;
    config(ctx: Koa.Context): Promise<void>;
    beforealltest(ctx: Koa.Context): Promise<void>;
    session(ctx: Koa.Context): Promise<void>;
    sessionCheck(ctx: Koa.Context): Promise<void>;
    reswarn(ctx: Koa.Context): Promise<void>;
    reserr(ctx: Koa.Context): Promise<void>;
    before(ctx: Koa.Context): Promise<void>;
    after(ctx: Koa.Context): Promise<void>;
    combin(ctx: Koa.Context): Promise<void>;
}
export {};
