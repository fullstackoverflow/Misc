/// <reference types="koa-router" />
/// <reference types="koa-session" />
import Koa from "koa";
import { TestService } from "../service/TestService";
export declare class Test {
    test: boolean;
}
export default class Router {
    value_test: string;
    TestService: TestService;
    staus(ctx: Koa.Context): Promise<void>;
    formdata(ctx: Koa.Context): Promise<void>;
    autowired(ctx: Koa.Context): Promise<void>;
    value(ctx: Koa.Context): Promise<void>;
    get(ctx: Koa.Context): Promise<void>;
    delete(ctx: Koa.Context): Promise<void>;
    put(ctx: Koa.Context): Promise<void>;
    validate(ctx: Koa.Context): Promise<void>;
    config(ctx: Koa.Context): Promise<void>;
}
