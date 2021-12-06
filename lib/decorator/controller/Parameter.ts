import { Parameters, ParameterDecoratorType } from "../../core/type/enum";

function ParameterDecoratorFactory(type: ParameterDecoratorType): Function {
    return function ParameterDecorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let parameterIndexs: { type: ParameterDecoratorType, index: number }[] = Reflect.getOwnMetadata(Parameters, target, propertyKey) || [];
        parameterIndexs.push({ type, index: parameterIndex });
        Reflect.defineMetadata(Parameters, parameterIndexs, target, propertyKey);
    }
}

export const Body = ParameterDecoratorFactory(ParameterDecoratorType.Body);
export const Query = ParameterDecoratorFactory(ParameterDecoratorType.Query);
export const Params = ParameterDecoratorFactory(ParameterDecoratorType.Params);
export const Headers = ParameterDecoratorFactory(ParameterDecoratorType.Header);
export const Ctx = ParameterDecoratorFactory(ParameterDecoratorType.Context);
