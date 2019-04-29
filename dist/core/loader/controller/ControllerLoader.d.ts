import { ClassLoader } from "../../type/interface";
import { MethodDecoratorType } from "../../type/enum";
import Koa from "koa";
import { Http } from "./methods/Http";
export declare class ControllerLoader implements ClassLoader {
    [MethodDecoratorType.Http]: Http;
    Load(clazz: FunctionConstructor, app: Koa): void;
}
