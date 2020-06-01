[![Build Status](https://www.travis-ci.org/fullstackoverflow/Misc.svg?branch=master)](https://www.travis-ci.org/fullstackoverflow/Misc.svg?branch=master)
[![codecov](https://codecov.io/gh/fullstackoverflow/Misc/branch/master/graph/badge.svg)](https://codecov.io/gh/fullstackoverflow/Misc)
[![NPM version](https://img.shields.io/npm/v/@tosee/misc.svg)](https://www.npmjs.com/@tosee/misc)

# Misc

> 基于Koa与Typescript构建的框架

# 快速开始

1. 安装命令行工具
```
npm i @tosee/misc-cli -g
```
2. 初始化项目并运行
```
mkdir project
misc new ./project
cd project
npm run dev
```

# 配置项

Misc继承自Koa,实例化Misc时可以传入不同的参数来配置Koa实例,Misc自带`koa-bodyparser`,`@koa/cors`依赖,可以通过不同的配置来实现不同的功能，具体的参数细节查看[API](http://fullstackoverflow.github.io/Misc/interfaces/_core_type_opts_.options.html)。

## keys

[Koa 的 cookie 签名秘钥](https://koa.bootcss.com/)

## beforeall

中间件数组,Misc会使用`koa-compose`组合数组中的中间件,这些中间处于`koa-bodyparser`,`@koa/cors`之后(如果有配置的话),routerpath目录中的各路由之前。

## routerpath

Misc会加载该配置目录及其子目录下的所有ts文件,并获取它们的默认导出(export default)，如果是`koa-router`实例(使用@Controller装饰器)则Misc会加载这些实例,默认路径```src/router```。

## body

`koa-bodyparser`配置选项，参照[koa-bodyparser](https://github.com/koajs/bodyparser)。

## protocol(必须)

可选 http 或 https,选择 https 时则必须配置 tls 选项。

## tls

https 配置，详见[https 参数](http://nodejs.cn/api/https.html#https_https_createserver_options_requestlistener)。

## cors

跨域配置,使用`@koa/cors`,参照[@koa/cors](https://github.com/koajs/cors)。

## port(必须)

监听端口号。

# 装饰器

> @Controller

路由类装饰器,实例化类时转化为一个`koa-router`实例,作用类似于`prefix`,例:

```
@Controller('/hello');
class Test{

}
```

> @GET

路由方法装饰器,与`@Controller`配合,实现一个 get 方法的路由,例:

```
@Controller('/hello');
class Test{
  @GET('/test')
  async test(ctx:Koa.Context)
}
```

> @POST

路由方法装饰器,与`@Controller`配合,实现一个 post 方法的路由,例:

```
@Controller('/hello');
class Test{
  @POST('/test')
  async test(ctx:Koa.Context)
}
```

> @PUT

路由方法装饰器,与`@Controller`配合,实现一个 put 方法的路由,例:

```
@Controller('/hello');
class Test{
  @PUT('/test')
  async test(ctx:Koa.Context)
}
```

> @DELETE

路由方法装饰器,与`@Controller`配合,实现一个 delete 方法的路由,例:

```
@Controller('/hello');
class Test{
  @DELETE('/test')
  async test(ctx:Koa.Context)
}
```

> @Validate

参数验证装饰器,使用[class-validator](https://github.com/typestack/class-validator)实现,传入 schema 即可完成校验,支持自定义错误处理。

```
export class Login {
	/**
	 * username describe
	 */
	@IsString()
	username: string;

  /**
	 * password describe
	 */
	@IsString()
	password: string;
}

@Controller('/hello');
class Test{
  @Autowired()
  UserService:UserService

  @GET('/test)
  @Validate({schema:Login,error:(errors)=>{
    throw new Error(`${errors.map(error=>Object.value(error.constraints))}`);
  }})
  async test(ctx:Koa.Context)
}
```

# 工具

## logger

打印信息，分为 error,info,和 succuess,带时间戳和不同颜色
```
import {logger} from '@tosee/misc'

logger.info("xxxx");
app.use(logger.Middleware()); //在后续中间件中的logger打印会带上唯一id,参考@tosee/log

```

# 扩展

[@tosee/config](https://github.com/fullstackoverflow/config)加载配置文件使用@Value装饰器注入

[@tosee/util](https://github.com/fullstackoverflow/util)@Before,@After,@Around,@Catch,@Autowired,@Schedule等工具装饰器

[@tosee/busboy](https://github.com/fullstackoverflow/busboy)对[busboy](https://github.com/mscdex/busboy)的封装,直接处理formdata文件流无临时文件,提供装饰器,中间件与自定义方式