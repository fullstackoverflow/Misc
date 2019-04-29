import Koa from "koa";

export interface ClassLoader {
	Load(clazz: FunctionConstructor, app: Koa): void;
}

export interface MethodLoader {
	Load(...args: any): void;
}
