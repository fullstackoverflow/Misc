import  * as Koa  from 'koa';
import { Core } from './core/core';
import { Log } from './utils/log';

export class Misc extends Core{
    private core:Core
    public rootPath:string

    constructor(rootPath:string){
        super();
        this.rootPath = rootPath;
        Log.info('Misc start');
        Log.info('Platform:'+process.platform+' node:'+process.version);
        super.fileScan(this.rootPath);
        super.registerRouters();
        Log.info('Misc start success');
    }
}

export {Get,Post,Put,Delete} from './decorate/http-methods'
export {Controller} from './decorate/controller'
export {Restc,restc} from './decorate/utils'
