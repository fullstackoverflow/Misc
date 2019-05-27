import { ClassLoader } from "../../type/interface";
import { ScheduleType, ConfigType } from "../../type/enum";
import Koa from "koa";
import { scheduleJob } from "node-schedule";
import { logger } from "../../../util/log";

export class ConfigLoader implements ClassLoader {
	Load(clazz: FunctionConstructor, app: Koa) {
		const instance: any = new clazz();
		const env = Reflect.getMetadata(ConfigType.ENV, clazz);
		return { env, instance };
	}
}
