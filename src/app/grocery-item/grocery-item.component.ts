import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GroceryItem, GroceryListState } from '../data.model';
import { fromGroceries } from '../store/selectors';
import { Store } from '@ngrx/store';
import { RemoveGroceryItemAction, IncrementItemQuantityAction, DecrementItemQuantityAction } from '../store/actions';

@Component({
  selector: 'tr [app-grocery-item]',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.css']
})
export class GroceryItemComponent implements OnChanges {
  @Input() groceryItemId: string;

  groceryItem$: Observable<GroceryItem>;

  constructor(
    private store: Store<GroceryListState>
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.groceryItemId && this.groceryItemId) {
      this.groceryItem$ = this.store.select(fromGroceries.selectGroceryItem(this.groceryItemId));
    }
  }

  removeItem() {
    // Dispatch a remove action to the store
    this.store.dispatch(new RemoveGroceryItemAction(this.groceryItemId));
  }

  incrementItemQuantity(): void {
    this.store.dispatch(new IncrementItemQuantityAction(this.groceryItemId));
  }

  decrementItemQuantity(): void {
    this.store.dispatch(new DecrementItemQuantityAction(this.groceryItemId));
  }

}
