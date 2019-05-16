import { ClassLoader } from "../../type/interface";
import { ScheduleType } from "../../type/enum";
import Koa from "koa";
import { scheduleJob } from "node-schedule";
import { logger } from "../../../util/log";

export class ScheduleLoader implements ClassLoader {
	Load(clazz: FunctionConstructor, app: Koa) {
		const rule = Reflect.getMetadata(ScheduleType.SCHEDULE, clazz);
		const instance: any = new clazz();
		if (!instance.exec) {
			throw new Error("Schedule class must implements exec() function");
		}
		logger.info(`Load schedule:${rule}`);
		scheduleJob(rule, instance.exec.bind(instance));
	}
}
