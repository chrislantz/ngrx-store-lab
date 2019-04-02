export interface GroceryList {
    items: GroceryItem[];
    filter: GroceryItemFilter;
    sort: GroceryItemSort;
}

export interface GroceryItem {
    uuid: string;
    name: string;
    quantity: number;
    price?: number;
}

export interface GroceryItemFilter {
    search: string;
    prop: string;
}

export interface GroceryItemSort {
    sort: string[];
    sortOrder: string[];
}
