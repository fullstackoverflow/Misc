import "reflect-metadata";
export declare function USE(url: string): MethodDecorator;
export declare function POST(url: string): MethodDecorator;
export declare function GET(url: string): MethodDecorator;
export declare function DELETE(url: string): MethodDecorator;
export declare function PUT(url: string): MethodDecorator;
/**
 * rewrite class constructor
 * @param prefix router prefix
 * @example
 * ```
 *
 * 	@Controller('/prefix')
 * 	export default class Router {
 * 	}
 *
 * ```
 */
export declare function Controller(prefix?: string): ClassDecorator;
