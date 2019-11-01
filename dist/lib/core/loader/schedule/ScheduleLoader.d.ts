import { ClassLoader } from "../../type/interface";
import Koa from "koa";
export declare class ScheduleLoader implements ClassLoader {
    Load(clazz: FunctionConstructor, app: Koa): void;
}
