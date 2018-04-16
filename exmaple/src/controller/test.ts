import {Controller, Get} from '../../../src/index';
import * as Koa from 'koa';

@Controller('/test')
class Test{
    @Get('/test1')
    test(ctx:Koa.Context,next:Function){
        ctx.response.body='Hello world'
    }
}