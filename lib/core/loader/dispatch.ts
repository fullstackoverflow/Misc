import { ClassDecoratorType, ControllerType, MethodDecoratorType, Type } from "../type/enum";
import Koa from "koa";
import { Autowired } from "../../decorator/util/Autowired";
import { ControllerLoader } from "./controller/ControllerLoader";
import { ScheduleLoader } from "./schedule/ScheduleLoader";

export class Dispatch {
	@Autowired
	ControllerLoader: ControllerLoader;

	@Autowired
	ScheduleLoader: ScheduleLoader;

	[ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa) {
		this.ControllerLoader.Load(clazz, app);
	}

	[ClassDecoratorType.Schedule](clazz: FunctionConstructor, app: Koa) {
		this.ScheduleLoader.Load(clazz, app);
	}
}
