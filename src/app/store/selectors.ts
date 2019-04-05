import { createSelector } from '@ngrx/store';
import { find, orderBy, filter, each } from 'lodash';

import { GroceryList, GroceryItem, GroceryItemFilter, GroceryItemSort } from '../data.model';

const getGroceryList = (state) => state.groceryList;

const selectGroceryItems = createSelector(
    getGroceryList,
    (groceryList: GroceryList) => groceryList.items,
);

const selectGroceryItemFilter = createSelector(
    getGroceryList,
    (groceryList: GroceryList) => groceryList.filter,
);

const selectGroceryItemSort = createSelector(
    getGroceryList,
    (groceryList: GroceryList) => groceryList.sort,
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
        // TODO: walk the items list and return the total price of our list
    }
);

export const fromGroceries = {
    selectGroceryItems,
    selectGroceryItemFilter,
    selectGroceryItemSort,
    selectFilteredAndSortedGroceryItems,
    selectTotalCartPrice,
};
