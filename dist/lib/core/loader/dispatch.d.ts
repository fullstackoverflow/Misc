import { ClassDecoratorType } from "../type/enum";
import Koa from "koa";
import { ControllerLoader } from "./controller/ControllerLoader";
export declare class Dispatch {
    ControllerLoader: ControllerLoader;
    [ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa): void;
}
