import { ValidationOptions, SchemaLike } from "joi";
export declare function Validate(ValidateOptions: {
    schema: SchemaLike;
    options: ValidationOptions;
}, property?: string): MethodDecorator;
