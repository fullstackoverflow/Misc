import { ClassLoader } from "../../type/interface";
import Koa from "koa";
export declare class ConfigLoader implements ClassLoader {
    Load(clazz: FunctionConstructor, app: Koa): {
        env: any;
        instance: any;
    };
}
