import { Injectable } from '@angular/core';
import groceryData from './data/data.json';
import { Observable } from 'rxjs/Observable';
import { GroceryItem } from './data.model.js';


@Injectable()
export class GroceryDataService {

  constructor() { }

  fetchGroceryData(): Observable<GroceryItem[]> {
    return Observable.of(groceryData.items);
  }

}
