export declare enum MODE {
    Singleton = 0,
    Ordinary = 1
}
export declare function Autowired(options?: {
    mode: MODE;
    arguments?: any[];
}): PropertyDecorator;
