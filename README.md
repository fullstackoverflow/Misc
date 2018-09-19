# 介绍

一个基于TypeScript和Koa开发的轮子。

# 快速开始
## 环境安装
### TypeScript
使用npm获取TypeScript
```
npm install -g typescript
```
确认
```
tsc -version
```
## demo
初始化tsconfig.json
```
tsc --init
```
Exmaple of tsconfig.json
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
    "target": "es6",
    "sourceMap": true,
    "allowJs": true,
    "outDir": "./dist"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```
使用npm获取Misc
```
npm install @tosee/misc -S
```
使用npm获取nodejs的ts提示
```
npm install @types/node -D
```
新建一个src目录并在其下面新建app.ts文件，并写入
```
import {Misc} from '@tosee/misc'

const app = new Misc(__dirname);

app.listen(3000);
```
使用ts-node运行
```
npm i ts-node -D
```



# 特性
## 初始化
Misc需要一个路径作为初始化的参数
```
import {Misc} from '@tosee/misc'

const app = new Misc(__dirname);
```
app对象是对koa实例的扩展，继承有koa的所有方法与属性。

## 路由加载
Misc会对指定路径下的所有.ts文件进行扫描并require,无需特别指定也无需继承特定方法，声明一个路由所需要的一切就是在指定路径下的.ts文件中使用@Controller或者@Get,@Post,@Put,@Delete方法既可。

## 装饰器
>@Controller

一级路径装饰器，类似express里的router.use('/prefix',router);
```
@Controller('/hello');
class Test{

}
```


