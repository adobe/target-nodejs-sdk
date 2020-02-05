export interface Product {
    id?: string;
    categoryId?: string;
}
export declare function ProductFromJSON(json: any): Product;
export declare function ProductFromJSONTyped(json: any, ignoreDiscriminator: boolean): Product;
export declare function ProductToJSON(value?: Product | null): any;
