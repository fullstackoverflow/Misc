import { ClassDecoratorType } from "../type/enum";
import Koa from "koa";
export declare class Dispatch {
    [ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa): void;
}
