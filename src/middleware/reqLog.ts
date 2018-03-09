import * as Koa from 'koa'
import { Log } from '../utils/log';

export const logger = async function(ctx:Koa.Context,next:Function){
    let method:string = ctx.method.toUpperCase();
    if(method==='GET'){
        Log.info('URL:'+ctx.url+' Method:'+method+' Params:'+ JSON.stringify(ctx.query));
    }else{
        Log.info('URL:'+ctx.url+' Method:'+method+' Params:'+ JSON.stringify(ctx.body));
    }
}