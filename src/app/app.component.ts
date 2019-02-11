import { Component, OnInit, OnDestroy } from '@angular/core';
import { v4 as newUuid } from 'uuid';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { GroceryList } from './data.model';
import {
    LoadGroceryListAction,
    AddGroceryItemAction,
    RemoveGroceryItemAction,
    IncrementItemQuantityAction,
    DecrementItemQuantityAction
} from './store/actions';
import groceryData from './data/data.json';

interface AppState {
    data: any;
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Grocery List';
    groceryList$: Observable<GroceryList>; // Observable
    groceryList: GroceryList; // View variable

    // inputs
    quantityInput = '';
    nameInput = '';

    subscriptions: Subscription = new Subscription;

    constructor (
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        // Define a local observable that will be bound to the items property of our store
        // 'groceryList' is what we registered our reducer as in app.module.ts
        this.groceryList$ = this.store.pipe(select('groceryList'));

        // Bind the store to recieve updates and update our component with new data
        this.subscriptions.add(this.groceryList$.subscribe((groceryList) => {
            this.groceryList = groceryList;
        }));

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

    ngOnDestroy() {
        // Unsubscribe from all the subscriptions we have setup in this component
        this.subscriptions.unsubscribe();
    }
}
