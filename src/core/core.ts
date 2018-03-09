import { logger } from './../middleware/reqLog';
import { Config } from './../interface/config.interface';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as glob from 'glob';
import * as path from "path";
import { koa2 as restc } from 'restc'
import { Log } from '../utils/log';
const router = new Router();

//定义不变字段，在使用时读取
export const symbolRoutePrefix: symbol = Symbol("routePrefix");
export const symbolConfig: symbol = Symbol('config');

/**
 * 路由执行类
 * 入口文件载入
 * const route = new Route(ctx: Koa);
 * 
 * @class Route
 */
export class Core {
    //静态 存储被修饰后的路由的地方
    static __DecoratedRouters: Map<Function | Function[], { target: any, method: string, path: string, restc?: boolean, describe?: string }> = new Map();
    private router: any;
    private app: Koa;


    /**
     * Creates an instance of Route.
     * 
     * @param {Koa} app
     * 
     * @memberOf Route
     */
    constructor(app: Koa, config?: any) {
        this.app = app;
        this.router = router;
    }

    fileScan(dir: string): void {
        try {
            glob.sync(path.join(dir, '**/*.ts')).forEach((item) => require(item));
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * 注册路由
     * new Route(ctx:Koa).registerRouters(apipath);
     * 
     * @param {String} controllerDir api文件路径
     * 
     * @memberOf Route
     */
    registerRouters(): void {
        Log.info('Router loading...');
        this.app.use(logger);
        for (let [controller, config] of Core.__DecoratedRouters) {
            let controllers = Array.isArray(controller) ? controller : [controller];
            let prefixPath = config.target[symbolRoutePrefix];
            let _config: Config = config.target[symbolConfig];

            if (prefixPath && (!prefixPath.startsWith('/'))) {
                prefixPath = '/' + prefixPath;
            }
            if (_config && _config.restc == true) {
                this.router.use(prefixPath, restc());
            }
            // //拼接api路由
            let routerPath = prefixPath + config.path;
            //将忽略路由集合
            controllers.forEach((controller) => {
                if (config.restc === true) {
                    this.router.use(routerPath, restc());
                }
                Log.warn(config.method.toUpperCase() + ':' + routerPath + (config.describe ? '   description:' + config.describe : ''));
                this.router[config.method](routerPath, controller)
            });
        }
        //一定要在router载入之前
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }
}