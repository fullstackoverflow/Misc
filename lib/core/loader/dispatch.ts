import { ClassDecoratorType, ControllerType, MethodDecoratorType, Type } from "../type/enum";
import Koa from "koa";
import { Autowired } from "../../decorator/util/Autowired";
import { ControllerLoader } from "./controller/ControllerLoader";

export class Dispatch {
	@Autowired
	ControllerLoader: ControllerLoader;

	[ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa) {
		this.ControllerLoader.Load(clazz, app);
	}
}
