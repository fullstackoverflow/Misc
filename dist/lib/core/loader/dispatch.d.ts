import { ClassDecoratorType } from "../type/enum";
import Koa from "koa";
import { ControllerLoader } from "./controller/ControllerLoader";
import { ScheduleLoader } from "./schedule/ScheduleLoader";
export declare class Dispatch {
    ControllerLoader: ControllerLoader;
    ScheduleLoader: ScheduleLoader;
    [ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa): void;
    [ClassDecoratorType.Schedule](clazz: FunctionConstructor, app: Koa): void;
}
