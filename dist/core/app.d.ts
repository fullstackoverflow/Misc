import 'reflect-metadata';
import Koa from 'koa';
import { options } from './type/opts';
export declare class Misc extends Koa {
    server: any;
    constructor(opts: options);
}
