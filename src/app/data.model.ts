import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface GroceryListState extends EntityState<GroceryItem> {
    filter: GroceryItemFilter;
    sort: GroceryItemSort;
}

export const groceryListAdapter = createEntityAdapter<GroceryItem>({
    selectId: (groceryItem => groceryItem.uuid),
    // sortComparer: ((item1, item2) => item1.price - item2.price)
});

// export const groceryListInitialState: GroceryListState = {
//     ids: ['groceryItem1'],
//     entities: {
//         groceryItem1: {
//             uuid: 'groceryItem1',
//             name: 'Eggs',
//             price: 5,
//             quantity: 6
//         }
//     },
//     filter: {
//         prop: '',
//         search: '',
//     },
//     sort: {
//         sort: [],
//         sortOrder: []
//     }
// };

export const groceryListInitialState: GroceryListState = groceryListAdapter.getInitialState({
    filter: {
        search: '',
        prop: 'name'
    },
    sort: {
        sort: ['quantity'],
        sortOrder: ['desc']
    }
});

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

export interface PriceData {
    [name: string]: {
        price: number;
    };
}
