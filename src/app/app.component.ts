import { v4 as newUuid } from 'uuid';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { GroceryList } from './data.model';
import {
    LoadGroceryListAction,
    AddGroceryItemAction,
    RemoveGroceryItemAction,
    IncrementItemQuantityAction,
    DecrementItemQuantityAction,
    SetSortAction,
    SetFilterAction,
} from './store/actions';
import groceryData from './data/data.json';
import { fromGroceries } from './store/selectors';

interface AppState {
    data: any;
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Grocery List';
    groceryList$: Observable<GroceryList>; // Observable
    groceryList: GroceryList; // View variable

    // inputs
    quantityInput = '';
    nameInput = '';
    filterInput = '';

    constructor (
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.groceryList$ = this.store.select(fromGroceries.selectFilteredAndSortedGroceryItems);

        // Pretend this was the result of getting this data via some async fetch
        setTimeout(() => {
            // Here we have revieved groceryData and are loading it into the store
            this.store.dispatch(new LoadGroceryListAction(groceryData));
        }, 0);
    }

    addItem() {
        const name = this.nameInput;
        const quantity = parseInt(this.quantityInput) || 1;
        const uuid = newUuid();

        // Dispatch an add action to the store
        this.store.dispatch(new AddGroceryItemAction({
            uuid,
            name,
            quantity
        }));

        // Reset the inputs
        this.nameInput = '';
        this.quantityInput = '';
    }

    removeItem(uuid: string) {
        // Dispatch a remove action to the store
        this.store.dispatch(new RemoveGroceryItemAction(uuid));
    }

    incrementItemQuantity(uuid: string): void {
        this.store.dispatch(new IncrementItemQuantityAction(uuid));
    }

    decrementItemQuantity(uuid: string): void {
        this.store.dispatch(new DecrementItemQuantityAction(uuid));
    }

    sort(sort: string) {
        this.store.dispatch(new SetSortAction(sort));
    }

    filterChanged(value: string) {
        this.store.dispatch(new SetFilterAction({ search: value, prop: 'name' }));
    }

    ngOnDestroy() {}
}
