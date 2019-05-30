import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

import {
    GroceryListActionTypes,
    DecrementItemQuantityAction,
    RemoveGroceryItemAction,
    NoopAction,
    LoadGroceryListAction,
    AddGroceryItemWithPriceAction,
    AddGroceryItemListAction,
    AddGroceryItemAction
} from './actions';
import { GroceryListState, GroceryItem } from '../data.model';
import { PricingService } from '../pricing.service';
import { GroceryDataService } from '../grocery-data.service';
import { Observable } from 'rxjs/Observable';
import { v4 as newUuid } from 'uuid';

@Injectable()
export class GroceryListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<{groceryList: GroceryListState}>,
        private pricingService: PricingService,
        private groceryDataService: GroceryDataService,
    ) {}

    // Effects are obserables which are bound to the store's action stream.
    // They watch the stream for actions which match types they are concerned
    // with. When such an action occurs, the effect may combine action data,
    // the current state of the store, and any other data. It returns a new
    // action which is dispatched against the store.

    @Effect()
    emptyQuantity$ = this.actions$.ofType<DecrementItemQuantityAction>(GroceryListActionTypes.DECREMENT_ITEM_QUANTITY)
    .withLatestFrom(this.store)
    .map(([action, state]) => {
        const item = state.groceryList.entities[action.uuid];
        const quantity = item.quantity;
        if (quantity < 1) {
            return new RemoveGroceryItemAction(action.uuid);
        }
        return new NoopAction();
    });

    @Effect()
    addGroceryItem = this.actions$.ofType<AddGroceryItemAction>(GroceryListActionTypes.ADD_GROCERY_ITEM)
    .mergeMap((action) => {
        return this.pricingService.getPriceForItem(action.name)
        .map((price) => {
            const itemWithPrice: GroceryItem = {
                name: action.name,
                quantity: action.quantity,
                uuid: newUuid(),
                price
            };

            return new AddGroceryItemWithPriceAction(itemWithPrice);
        });
    });

    @Effect()
    loadGroceryList$ = this.actions$.ofType<LoadGroceryListAction>(GroceryListActionTypes.LOAD_GROCERY_LIST)
    .mergeMap(() => {
        const groceryData$ = this.groceryDataService.fetchGroceryData();

        return groceryData$.map((groceryData) => {
            return groceryData.map((groceryItem) => {
                return this.pricingService.getPriceForItem(groceryItem.name)
                .map((price): GroceryItem => {
                    return {
                        ...groceryItem,
                        price
                    };
                });
            });
        })
        .mergeMap(observables => Observable.forkJoin(observables))
        .map((items => new AddGroceryItemListAction(items)));
    });
}
