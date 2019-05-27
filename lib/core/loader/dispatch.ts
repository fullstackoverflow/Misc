import { ClassDecoratorType, ControllerType, MethodDecoratorType, Type } from "../type/enum";
import Koa from "koa";
import { Autowired } from "../../decorator/util/Autowired";
import { ControllerLoader } from "./controller/ControllerLoader";
import { ScheduleLoader } from "./schedule/ScheduleLoader";
import { ConfigLoader } from "./config/ConfigLoader";

export class Dispatch {
	@Autowired
	ControllerLoader: ControllerLoader;

	@Autowired
	ScheduleLoader: ScheduleLoader;

	@Autowired
	ConfigLoader: ConfigLoader;

	[ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa) {
		this.ControllerLoader.Load(clazz, app);
	}

	[ClassDecoratorType.Config](clazz: FunctionConstructor, app: Koa) {
		return this.ConfigLoader.Load(clazz, app);
	}

	[ClassDecoratorType.Schedule](clazz: FunctionConstructor, app: Koa) {
		this.ScheduleLoader.Load(clazz, app);
	}
}
