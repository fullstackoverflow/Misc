import { ClassDecoratorType } from "../type/enum";
import Koa from "koa";
import { ControllerLoader } from "./controller/ControllerLoader";
import { ScheduleLoader } from "./schedule/ScheduleLoader";
import { ConfigLoader } from "./config/ConfigLoader";
export declare class Dispatch {
    ControllerLoader: ControllerLoader;
    ScheduleLoader: ScheduleLoader;
    ConfigLoader: ConfigLoader;
    [ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa): void;
    [ClassDecoratorType.Config](clazz: FunctionConstructor, app: Koa): {
        env: any;
        instance: any;
    };
    [ClassDecoratorType.Schedule](clazz: FunctionConstructor, app: Koa): void;
}
