import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { GroceryList } from './data.model';
import { LoadGroceryListAction } from './store/actions';
import groceryData from './data/data.json';

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

    ngOnDestroy() {
        // Unsubscribe from all the subscriptions we have setup in this component
        this.subscriptions.unsubscribe();
    }
}
