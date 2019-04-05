import { GroceryList } from '../data.model';
import { reject, filter, cloneDeep } from 'lodash';

import {
    GroceryListAction,
    LoadGroceryListAction,
    AddGroceryItemAction,
    RemoveGroceryItemAction,
    IncrementItemQuantityAction,
    DecrementItemQuantityAction,
    GroceryListActionTypes
} from './actions';

// Default empty state for our store.
const initialGroceryList: GroceryList = {
    items: []
};

// A specific reducer method for the LoadGroceryListAction. It is important that we return
// a new state which is cloned from our old state along with any changes we make which result
// from the action.
function loadGroceryList(state: GroceryList, action: LoadGroceryListAction): GroceryList {
    return {
        ...action.groceryList
    };
}

function addGroceryItem(state: GroceryList, action: AddGroceryItemAction): GroceryList {
    const updatedItems = cloneDeep(state.items);

    updatedItems.push(action.item);

    return {
        ...state,
        items: updatedItems
    };
}

function removeGroceryItem(state: GroceryList, action: RemoveGroceryItemAction): GroceryList {
    const newItems = [...reject(state.items, { uuid: action.uuid })];

    return {
        ...state,
        items: newItems
    };
}

function decrementItemQuantity(state: GroceryList, action: DecrementItemQuantityAction): GroceryList {
    const updatedItems = cloneDeep(state.items);
    const item = filter(updatedItems, { uuid: action.uuid });

    if (item && item.length && item[0].quantity) {
        item[0].quantity--;
    }

    return {
        ...state,
        items: updatedItems
    };
}

function incrementItemQuantity(state: GroceryList, action: IncrementItemQuantityAction): GroceryList {
    const updatedItems = cloneDeep(state.items);
    const item = filter(updatedItems, { uuid: action.uuid });

    if (item && item.length) {
        item[0].quantity++;
    }

    return {
        ...state,
        items: updatedItems
    }
}

// The reducer dispatch method, we send the action to a specific reducer function based upon
// the actions type, compute an updated state and return it.
export function reducer(state: GroceryList = initialGroceryList, action: GroceryListAction) {
    switch (action.type) {
        case GroceryListActionTypes.LOAD_GROCERY_LIST:
            return loadGroceryList(state, action);
        case GroceryListActionTypes.ADD_GROCERY_ITEM:
            return addGroceryItem(state, action);
        case GroceryListActionTypes.REMOVE_GROCERY_ITEM:
            return removeGroceryItem(state, action);
        case GroceryListActionTypes.DECREMENT_ITEM_QUANTITY:
            return decrementItemQuantity(state, action);
        case GroceryListActionTypes.INCREMENT_ITEM_QUANTITY:
            return incrementItemQuantity(state, action);
    }

    return state;
}
