import { GroceryListState, GroceryItemSort, groceryListAdapter, groceryListInitialState } from '../data.model';

import {
    GroceryListAction,
    RemoveGroceryItemAction,
    IncrementItemQuantityAction,
    DecrementItemQuantityAction,
    SetFilterAction,
    SetSortAction,
    GroceryListActionTypes,
    AddGroceryItemListAction,
    AddGroceryItemWithPriceAction
} from './actions';

// A specific reducer method for the LoadGroceryListAction. It is important that we return
// a new state which is cloned from our old state along with any changes we make which result
// from the action.
function addGroceryItemList(state: GroceryListState, action: AddGroceryItemListAction): GroceryListState {
    return groceryListAdapter.addAll(action.groceryList, state);
}

function addGroceryItem(state: GroceryListState, action: AddGroceryItemWithPriceAction): GroceryListState {
    return groceryListAdapter.addOne(action.item, state);
}

function removeGroceryItem(state: GroceryListState, action: RemoveGroceryItemAction): GroceryListState {
    return groceryListAdapter.removeOne(action.uuid, state);
}

function decrementItemQuantity(state: GroceryListState, action: DecrementItemQuantityAction): GroceryListState {
    const currentQuantity = state.entities[action.uuid].quantity;

    return groceryListAdapter.updateOne({
        id: action.uuid,
        changes: {
            quantity: currentQuantity - 1
        }
    }, state);
}

function incrementItemQuantity(state: GroceryListState, action: IncrementItemQuantityAction): GroceryListState {
    const currentQuantity = state.entities[action.uuid].quantity;

    return groceryListAdapter.updateOne({
        id: action.uuid,
        changes: {
            quantity: currentQuantity + 1
        }
    }, state);
}

function setFilter(state: GroceryListState, action: SetFilterAction): GroceryListState {
    return {
        ...state,
        filter: action.filter
    };
}

function setSort(state: GroceryListState, action: SetSortAction): GroceryListState {
    const sortOrder = ['desc'];
    // if we triggered an action with the same sort as currently exists, we want to toggle the sort order
    if (state.sort.sortOrder && state.sort.sortOrder.length && action.sort === state.sort.sort[0]) {
        sortOrder[0] = (state.sort.sortOrder[0] === 'asc') ? 'desc' : 'asc';
    }

    const newSort: GroceryItemSort = {
        sort: [action.sort],
        sortOrder
    };
    return {
        ...state,
        sort: newSort
    };
}

// The reducer dispatch method, we send the action to a specific reducer function based upon
// the actions type, compute an updated state and return it.
export function reducer(state: GroceryListState = groceryListInitialState, action: GroceryListAction): GroceryListState {
    switch (action.type) {
        case GroceryListActionTypes.ADD_GROCERY_ITEM_LIST:
            return addGroceryItemList(state, action);
        case GroceryListActionTypes.ADD_GROCERY_ITEM_WITH_PRICE:
            return addGroceryItem(state, action);
        case GroceryListActionTypes.REMOVE_GROCERY_ITEM:
            return removeGroceryItem(state, action);
        case GroceryListActionTypes.DECREMENT_ITEM_QUANTITY:
            return decrementItemQuantity(state, action);
        case GroceryListActionTypes.INCREMENT_ITEM_QUANTITY:
            return incrementItemQuantity(state, action);
        case GroceryListActionTypes.SET_FILTER:
            return setFilter(state, action);
        case GroceryListActionTypes.SET_SORT:
            return setSort(state, action);
    }

    return state;
}
