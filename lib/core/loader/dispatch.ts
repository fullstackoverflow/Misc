import { ClassDecoratorType } from "../type/enum";
import Koa from "koa";
import { Autowired } from "@tosee/util";
import { ControllerLoader } from "./controller/ControllerLoader";

export class Dispatch {
	@Autowired()
	ControllerLoader: ControllerLoader;

	[ClassDecoratorType.Controller](clazz: FunctionConstructor, app: Koa) {
		this.ControllerLoader.Load(clazz, app);
	}
}
