export class Type {
	static readonly ClassType: unique symbol = Symbol("ClassType");
	static readonly MethodType: unique symbol = Symbol("MethodType");
}

export class ClassDecoratorType {
	static readonly Controller: unique symbol = Symbol("controller");
	static readonly Schedule: unique symbol = Symbol("schedule");
	static readonly Config: unique symbol = Symbol("config");
	static readonly Component: unique symbol = Symbol("component");
	static readonly Singleton: unique symbol = Symbol("singleton");
}

export enum MethodDecoratorType {
	Http = "Http"
}

export class ControllerType {
	static readonly PREFIX: unique symbol = Symbol("prefix");
	static readonly PATH: unique symbol = Symbol("path");
	static readonly METHOD: unique symbol = Symbol("method");
	static readonly VALUE: unique symbol = Symbol("value");
}

export const Parameters = Symbol("Parameters");

export class ParameterDecoratorType {
	static readonly Body: unique symbol = Symbol("body");
	static readonly Header: unique symbol = Symbol("header");
	static readonly Query: unique symbol = Symbol("query");
	static readonly Params: unique symbol = Symbol("params");
	static readonly Context: unique symbol = Symbol("context");
}

export enum Methods {
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete"
}
