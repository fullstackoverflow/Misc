export declare const Container: Map<any, any>;
/**
 * Inject a class instance
 * @param params class constructor params
 * @example
 * ```typescript
 *
 * class Service{
 * }
 *
 * class Test{
 *  @Autowired()
 *  Service:Service
 * }
 * ```
 */
export declare function Autowired(target: any, propertyKey: string): void;
