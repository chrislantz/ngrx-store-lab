import { createSelector, createFeatureSelector } from '@ngrx/store';
import { orderBy, filter, each } from 'lodash';

import { GroceryListState, GroceryItem, GroceryItemFilter, GroceryItemSort, groceryListAdapter, GroceryListStoreName } from '../data.model';

const adapterSelectors = groceryListAdapter.getSelectors();

const selectGroceryListState = createFeatureSelector<GroceryListState>(GroceryListStoreName);

const selectGroceryItems = createSelector(
    selectGroceryListState,
    adapterSelectors.selectAll
);

const selectGroceryItemFilter = createSelector(
    selectGroceryListState,
    (groceryList: GroceryListState) => groceryList.filter,
);

const selectGroceryItemSort = createSelector(
    selectGroceryListState,
    (groceryList: GroceryListState) => groceryList.sort,
);

const selectFilteredAndSortedGroceryItems = createSelector(
    selectGroceryItems,
    selectGroceryItemFilter,
    selectGroceryItemSort,
    (items: GroceryItem[], itemFilter: GroceryItemFilter, sort: GroceryItemSort) => {
        return orderBy(filter(items, (item: GroceryItem) => {
            const searched = item[itemFilter.prop];
            if (searched && typeof searched === 'string') {
                return !itemFilter.search || searched.includes(itemFilter.search);
            }
            return false;
        }), sort.sort, sort.sortOrder);
    }
);

const selectTotalCartPrice = createSelector(
    selectFilteredAndSortedGroceryItems,
    (items: GroceryItem[]) => {
        let totalCartPrice = 0;
        each(items, (item) => {
            if (item.price) {
                totalCartPrice += item.price * item.quantity;
            }
        });
        return totalCartPrice;
    }
);

const selectGroceryItemIds = createSelector(
    selectGroceryListState,
    adapterSelectors.selectIds
);

const selectGroceryItem = ((uuid: string) => {
    return createSelector(
        selectGroceryListState,
        (state) => state.entities[uuid]
    );
});

export const fromGroceries = {
    selectGroceryItems,
    selectGroceryItemFilter,
    selectGroceryItemSort,
    selectFilteredAndSortedGroceryItems,
    selectTotalCartPrice,
    selectGroceryItem,
    selectGroceryItemIds,
};
