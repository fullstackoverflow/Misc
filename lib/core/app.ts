import 'reflect-metadata';
import Koa from 'koa';
import compose from 'koa-compose';
import glob from 'glob';
import { join } from 'path';
import Router from 'koa-router';
import { logger } from '../util/log';
import http from 'http';
import https from 'https';
import { options } from './type/opts';
import cors from '@koa/cors';
import session from 'koa-session';
import body from 'koa-body';

export class Misc extends Koa {
    server: any;
    constructor(opts: options) {
        super();
        if (opts.body) {
            this.use(body(opts.body));
        } else {
            this.use(body());
        }
        this.keys = opts.keys;
        if (opts.cors) {
            logger.success('cors true');
            this.use(cors());
        }
        if (opts.session) {
            this.use(session(opts.session, this));
        }
        if (opts.beforeall) {
            this.use(compose(opts.beforeall));
        }
        let routerPath = [];
        if (opts.routerpath) {
            glob.sync(join(opts.routerpath, './**/*.*{ts,js}')).forEach((item) => {
                if (require(item).default) {
                    try {
                        let router: Router = new (require(item).default)();
                        if (router instanceof Router) {
                            routerPath.push(item);
                            this.use(router.routes()).use(router.allowedMethods());
                        } else {
                            logger.error('router is not a Router instance:', item);
                        }
                    } catch (e) {
                        logger.error('router load failed:', item);
                    }
                } else {
                    logger.error('router without default export', item);
                }
            }, this);
        }
        if (opts.protocol == 'http') {
            this.server = http.createServer(this.callback()).listen(opts.port);
        } else if (opts.protocol == 'https') {
            this.server = https.createServer(opts.tls, this.callback()).listen(opts.port);
        } else {
            logger.error('lack of protocol');
        }
        if (opts.routerpath) {
            logger.success('Router Loading:', routerPath.map((item) => {
                return item.split('/').pop();
            }));
        }
        logger.success('NODE_ENV:' + process.env.NODE_ENV);
        logger.success('server start at:' + opts.port);
        logger.success('protocol:', opts.protocol);
    }
}