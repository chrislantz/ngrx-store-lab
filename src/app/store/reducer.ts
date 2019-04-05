import { GroceryList } from '../data.model';

import {
    GroceryListAction,
    LoadGroceryListAction,
    GroceryListActionTypes
} from './actions';

// Default empty state for our store.
const initialGroceryList = {
    items: []
};

// A specific reducer method for the LoadGroceryListAction. It is important that we return
// a new state which is cloned from our old state along with any changes we make which result
// from the action.
function loadGroceryList(state: GroceryList, action: LoadGroceryListAction) {
    return {
        ...action.groceryList
    };
}

// The reducer dispatch method, we send the action to a specific reducer function based upon
// the actions type, compute an updated state and return it.
export function reducer(state: GroceryList = initialGroceryList, action: GroceryListAction) {
    let newState: GroceryList;

    switch (action.type) {
        case GroceryListActionTypes.LOAD_GROCERY_LIST:
            return loadGroceryList(state, action);
    }

    return state;
}
