[![Build Status](https://www.travis-ci.org/fullstackoverflow/Misc.svg?branch=master)](https://www.travis-ci.org/fullstackoverflow/Misc.svg?branch=master)
[![codecov](https://codecov.io/gh/fullstackoverflow/Misc/branch/master/graph/badge.svg)](https://codecov.io/gh/fullstackoverflow/Misc)

# 介绍

TypeScript+Koa。

# 快速开始

1. 新建目录
2. 加入`tsconfig.json`文件,例如:
```
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "allowJs": true,
    "outDir": "./dist",
    "resolveJsonModule": true,
    "esModuleInterop": true
  },
  "exclude": [
    "node_modules/**/*",
    "**/*.spec.ts"
  ]
}
```
3. 安装```npm install @tosee/misc -S```
4. 新建app.ts,例如:
```
import { Misc } from '@tosee/misc';

const app = new Misc({
    protocol: 'http',
    port: 6060
});

const server = app.server;

export { server }
```
5. 安装ts-node```npm install -g ts-node```
6. 运行```ts-node ./app.ts```

# 配置项
Misc继承自Koa,实例化Misc时可以传入不同的参数来配置Koa实例,Misc自带```koa-body```,```@koa/cors```,```koa-session```依赖,可以通过不同的配置来实现不同的功能。

## keys
[Koa的cookie签名秘钥](https://koa.bootcss.com/)

## beforeall
中间件数组,Misc会使用```koa-compose```组合数组中的中间件,这些中间处于```koa-body```,```@koa/cors```和```koa-session```之后(如果有配置的话),routerpath目录中的各路由之前。

## routerpath
Misc会加载该配置目录及其子目录下的所有js与ts文件,并获取它们的默认导出(export default)，如果是```koa-router```实例则Misc会加载这些实例。

## body
```koa-body```配置选项，参照[koa-body](https://github.com/dlau/koa-body)。

## protocol(必须)
可选http或https,选择https时则必须配置tls选项。

## tls
https配置，详见[https参数](http://nodejs.cn/api/https.html#https_https_createserver_options_requestlistener)。

## cors
跨域配置,使用```@koa/cors```,参照[@koa/cors](https://github.com/koajs/cors)。

## session
session配置使用```koa-session```,参照[koa-session](https://github.com/koajs/session)。

## callback
传入作为http(https)的listen函数的第二参数，配合```--detectOpenHandles```和```--forceExit```伪修复jest的测试结束无法退出的问题

## port(必须)
监听端口号。

## 装饰器
>@Controller

路由类装饰器,实例化类时转化为一个```koa-router```实例,作用类似于```prefix```,例:
```
@Controller('/hello');
class Test{

}
```

>@GET

路由方法装饰器,与```@Controller```配合,实现一个get方法的路由,例:
```
@Controller('/hello');
class Test{
  @GET('/test')
  async test(ctx:Koa.Context)
}
```

>@POST

路由方法装饰器,与```@Controller```配合,实现一个post方法的路由,例:
```
@Controller('/hello');
class Test{
  @POST('/test')
  async test(ctx:Koa.Context)
}
```

>@PUT

路由方法装饰器,与```@Controller```配合,实现一个put方法的路由,例:
```
@Controller('/hello');
class Test{
  @PUT('/test')
  async test(ctx:Koa.Context)
}
```

>@DELETE

路由方法装饰器,与```@Controller```配合,实现一个delete方法的路由,例:
```
@Controller('/hello');
class Test{
  @DELETE('/test')
  async test(ctx:Koa.Context)
}
```

>@Autowired

依赖注入,参数为类初始化传入参数,该装饰器注入的类必须写明类型。
```
@Controller('/hello');
class Test{
  @Autowired()
  UserService:UserService

  @GET('/test)
  async test(ctx:Koa.Context)
}
```

>@Validate

参数验证装饰器,使用[joi](https://github.com/hapijs/joi)实现,传入schema即可完成校验。
```
import { object, string } from 'joi';

const Login = object({
    username: string().required(),
    password: string().required()
})

@Controller('/hello');
class Test{
  @Autowired()
  UserService:UserService

  @GET('/test)
  @Validate({schema:Login})
  async test(ctx:Koa.Context)
}
```

>@Value

配置注入装饰器,传入配置属性（即`Config.instance`下的属性）。
```
@Controller('/hello');
class Test{
  @Value("test")  //类似于Config.instance.test
  test:string

  @GET('/test)
  async test(ctx:Koa.Context){
    ctx.body = this.test;
  }
}
```

## 工具

# Config
配置加载类,使用前需要设置```Config.path```,```Config.instance```会加载与当前环境变量中```NODE_ENV```相同的ts文件,并监控文件修改事件实时更新。

config/development.ts
```
export default {
    db: localhost:27017/xxxx
}
```
test.ts
```
Config.path = './config';
console.log(Config.instance.db);
```

```
$ export NODE_ENV=development&&ts-node ./test.ts
```

# logger

打印信息，分为error,info,和succuess,带时间戳和不同颜色

# response

## ResSuccess

```
ctx.body = new ResSuccess('success',null);

'{code:2,message:"success",data:null}'
```

## ResWarn

```
throw new ResWarn('warn',null);

'{code:1,message:"warn",data:null}'
```

## ResError

```
throw new ResError('error',null);

'{code:0,message:"error",data:null}'
```