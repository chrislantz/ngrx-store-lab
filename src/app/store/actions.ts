import { Action } from '@ngrx/store';

export enum GroceryListActionTypes {
    LOAD_GROCERY_LIST = 'LOAD_GROCERY_LIST',
}

export class LoadGroceryListAction implements Action {
    readonly type = GroceryListActionTypes.LOAD_GROCERY_LIST;

    constructor(public groceryList: any) {}
}

export type GroceryListAction =
    LoadGroceryListAction
    ;
