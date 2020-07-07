export interface Order {
    id?: string;
    total?: number;
    purchasedProductIds?: Array<string>;
    time?: Date;
    experienceLocalId?: number;
    duplicate?: boolean;
    outlier?: boolean;
}
export declare function OrderFromJSON(json: any): Order;
export declare function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order;
export declare function OrderToJSON(value?: Order | null): any;
