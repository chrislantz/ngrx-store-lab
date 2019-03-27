import { Action } from '@ngrx/store';
import { GroceryItem } from '../data.model';

export enum GroceryListActionTypes {
    LOAD_GROCERY_LIST = 'LOAD_GROCERY_LIST',
    ADD_GROCERY_ITEM = 'ADD_GROCERY_ITEM',
    REMOVE_GROCERY_ITEM = 'REMOVE_GROCERY_ITEM',
    INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY',
    DECREMENT_ITEM_QUANTITY = 'DECREMENT_ITEM_QUANTITY',
    NO_OP = 'NO_OP'
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

export class DecrementItemQuantityAction implements Action {
    readonly type = GroceryListActionTypes.DECREMENT_ITEM_QUANTITY;

    constructor(public uuid: string) {}
}

export class IncrementItemQuantityAction implements Action {
    readonly type = GroceryListActionTypes.INCREMENT_ITEM_QUANTITY;

    constructor(public uuid: string) {}
}

export class NoopAction implements Action {
    readonly type = GroceryListActionTypes.NO_OP;
    constructor() {}
}

export type GroceryListAction =
    | LoadGroceryListAction
    | AddGroceryItemAction
    | RemoveGroceryItemAction
    | DecrementItemQuantityAction
    | IncrementItemQuantityAction
    ;
