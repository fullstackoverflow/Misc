import {Controller, Get} from '@tosee/misc';
import * as Koa from 'koa';

@Controller('/test')
class Test{
    @Get('/test1')
    test(ctx:Koa.Context,next:Function){
        ctx.response.body='Hello world'
        next();
    }
}