import { Action } from '@ngrx/store';
import { GroceryItem } from '../data.model';

export enum GroceryListActionTypes {
    LOAD_GROCERY_LIST = 'LOAD_GROCERY_LIST',
    ADD_GROCERY_ITEM = 'ADD_GROCERY_ITEM',
    REMOVE_GROCERY_ITEM = 'REMOVE_GROCERY_ITEM'
}

export class LoadGroceryListAction implements Action {
    readonly type = GroceryListActionTypes.LOAD_GROCERY_LIST;

    constructor(public groceryList: any) {}
}

export class AddGroceryItemAction implements Action {
    readonly type = GroceryListActionTypes.ADD_GROCERY_ITEM;

    constructor(public item: GroceryItem) {}
}

export class RemoveGroceryItemAction implements Action {
    readonly type = GroceryListActionTypes.REMOVE_GROCERY_ITEM;

    constructor(public uuid: string) {}
}

export type GroceryListAction =
    | LoadGroceryListAction
    | AddGroceryItemAction
    | RemoveGroceryItemAction
    ;
