import { MethodLoader } from "../../../type/interface";
import Router from "koa-router";
export declare class Http implements MethodLoader {
    Load(fn: Function, instance: any, router: Router): void;
}
