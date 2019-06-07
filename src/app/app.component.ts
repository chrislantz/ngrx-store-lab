import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/first';

import { GroceryListState } from './data.model';
import {
    LoadGroceryListAction,
    AddGroceryItemAction,
    SetSortAction,
    SetFilterAction,
} from './store/actions';
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
    groceryList$: Observable<GroceryListState>; // Observable
    totalCartPrice$: Observable<number>;

    // inputs
    quantityInput = '';
    nameInput = '';
    filterInput = '';

    constructor (
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.groceryList$ = this.store.select(fromGroceries.selectFilteredAndSortedGroceryItems);
        this.totalCartPrice$ = this.store.select(fromGroceries.selectTotalCartPrice);

        // Trigger the store to load the grocery list and initalize the data.
        this.store.dispatch(new LoadGroceryListAction);
    }

    addItem() {
        const name = this.nameInput;
        const quantity = parseInt(this.quantityInput) || 1;

        // Dispatch an add action to the store
        this.store.dispatch(new AddGroceryItemAction(name, quantity));

        // Reset the inputs
        this.nameInput = '';
        this.quantityInput = '';
    }

    sort(sort: string) {
        this.store.dispatch(new SetSortAction(sort));
    }

    filterChanged(value: string) {
        this.store.dispatch(new SetFilterAction({ search: value, prop: 'name' }));
    }

    ngOnDestroy() {}
}
