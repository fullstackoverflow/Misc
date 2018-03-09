import  * as Koa  from 'koa';
import { Core } from './core/core';
import { Log } from './utils/log';

export class Misc extends Koa{
    private core:Core
    public rootPath:string

    constructor(rootPath:string){
        Log.info('Misc start');
        Log.info('Platform:'+process.platform+' version:'+process.version);
        super();
        this.rootPath = rootPath;
        this.core = new Core(this);
        this.core.fileScan(this.rootPath);
        this.core.registerRouters();
        Log.info('Misc start success');
    }
}

export {Get,Post,Put,Delete} from './decorate/http-methods'
export {Controller} from './decorate/controller'
export {Restc,restc} from './decorate/utils'
