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
    // TODO: write this reducer
    return null;
}

function removeGroceryItem(state: GroceryList, action: RemoveGroceryItemAction): GroceryList {
    // TODO: write this reducer
    return null;
}

function decrementItemQuantity(state: GroceryList, action: DecrementItemQuantityAction): GroceryList {
    // TODO: write this reducer
    return null;
}

function incrementItemQuantity(state: GroceryList, action: IncrementItemQuantityAction): GroceryList {
    // TODO: write this reducer
    return null;
}

// The reducer dispatch method, we send the action to a specific reducer function based upon
// the actions type, compute an updated state and return it.
export function reducer(state: GroceryList = initialGroceryList, action: GroceryListAction) {
    let newState: GroceryList;

    switch (action.type) {
        case GroceryListActionTypes.LOAD_GROCERY_LIST:
            newState = loadGroceryList(state, action);
            break;
        case GroceryListActionTypes.ADD_GROCERY_ITEM:
            newState = addGroceryItem(state, action);
            break;
        case GroceryListActionTypes.REMOVE_GROCERY_ITEM:
            newState = removeGroceryItem(state, action);
            break;
        case GroceryListActionTypes.DECREMENT_ITEM_QUANTITY:
            newState = decrementItemQuantity(state, action);
            break;
        case GroceryListActionTypes.INCREMENT_ITEM_QUANTITY:
            newState = incrementItemQuantity(state, action);
            break;
    }

    return newState || state;
}