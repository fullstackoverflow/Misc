import Koa from "koa";
import {
	Controller,
	Autowired,
	POST,
	Validate,
	ResSuccess,
	GET,
	File,
	DELETE,
	PUT,
	Value,
    Config
} from "../../lib/index";
import { TestService } from "../service/TestService";
import { object, boolean } from "joi";

@Controller()
export default class Router {
	@Value("test")
	value_test: string;

	@Autowired()
	TestService: TestService;

	@POST("/basetest")
	async staus(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", ctx.request.body);
	}

	@POST("/formdata")
	@File()
	async formdata(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", ctx.request.body.file.name);
	}

	@POST("/autowired")
	async autowired(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", this.TestService.test());
	}

	@POST("/value")
	async value(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", this.value_test);
	}

	@GET("/get")
	async get(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
	}

	@DELETE("/delete")
	async delete(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
	}

	@PUT("/put")
	async put(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
	}

	@POST("/validate")
	@Validate({
		schema: object({
			test: boolean().required()
		})
	})
	async validate(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", "success");
    }
    
    @POST("/config")
	async config(ctx: Koa.Context) {
		ctx.body = new ResSuccess("", Config.instance.test);
	}
}