import { Controller } from "../../lib/decorator/controller/controller";
import { GET, POST } from "../../lib/decorator/controller/method";
import { Context } from "koa";

@Controller()
export class Router {
	constructor() {}

	test3() {
		return "this is test3";
	}

	@GET("/path2")
	test(ctx: Context) {
		ctx.body = this.test3();
	}

	@POST("/path3")
	test2() {
		console.log("it is a test");
	}
}
