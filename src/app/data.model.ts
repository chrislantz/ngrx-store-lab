export interface GroceryList {
    items: GroceryItem[];
}

export interface GroceryItem {
    uuid: string;
    name: string;
    quantity: number;
    price?: number;
}
