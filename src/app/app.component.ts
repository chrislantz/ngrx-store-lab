import { v4 as newUuid } from 'uuid';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { each } from 'lodash';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/first';

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
import pricingData from './data/pricing.json';
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
    totalCartPrice$: Observable<number>;
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
        this.totalCartPrice$ = this.store.select(fromGroceries.selectTotalCartPrice);

        // Create observables which resolve with our data after a specified delay
        const groceryData$ = Observable.of(groceryData).delay(100);
        const pricingData$ = Observable.of(pricingData).delay(2500);

        // combineLatest() will update any time either observable updates, AFTER both observables
        // have updated at least once. In this instance we only care about the first updates, which
        // is why we user first(). This makes it so we don't need to manually unsubscribe as first
        // takes care of that for us.
        groceryData$.combineLatest(pricingData$).first().subscribe(([gData, pData]) => {
            each(gData.items, (item) => {
                const itemPriceInfo = pData[item.name];
                const itemPrice = itemPriceInfo && itemPriceInfo.price;
                item.price = itemPrice;
            });
            this.store.dispatch(new LoadGroceryListAction(gData));
        });
    }

    addItem() {
        const name = this.nameInput;
        const quantity = parseInt(this.quantityInput) || 1;
        const uuid = newUuid();
        const price = pricingData && pricingData[name].price;

        // Dispatch an add action to the store
        this.store.dispatch(new AddGroceryItemAction({
            uuid,
            name,
            quantity,
            price
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
