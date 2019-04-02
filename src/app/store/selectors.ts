import { createSelector } from '@ngrx/store';
import { find, orderBy, filter } from 'lodash';

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

export const fromGroceries = {
    selectGroceryItems,
    selectGroceryItemFilter,
    selectGroceryItemSort,
    // TODO: implement this selector
    // selectFilteredAndSortedGroceryItems,
};
