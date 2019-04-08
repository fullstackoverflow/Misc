export declare enum MODE {
    Singleton = 0,
    Ordinary = 1
}
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
export declare function Autowired(options?: {
    mode: MODE;
    arguments?: any[];
}): PropertyDecorator;
