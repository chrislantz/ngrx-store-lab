import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import pricingData from './data/pricing.json';

@Injectable()
export class PricingService {

  constructor() { }

  // This function returns data from the pricing.json file, but provides the same interface it would
  // if it were fetching from an API.
  getPriceForItem(itemName: string): Observable<number> {
    if (pricingData[itemName] && pricingData[itemName].price) {
      return Observable.of(pricingData[itemName].price);
    }

    return Observable.of(undefined);
  }

}
