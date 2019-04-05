import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { find } from 'lodash';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import { GroceryListActionTypes, DecrementItemQuantityAction, RemoveGroceryItemAction, NoopAction } from './actions';

@Injectable()
export class GroceryListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
    ) {}

    // Effects are obserables which are bound to the store's action stream.
    // They watch the stream for actions which match types they are concerned
    // with. When such an action occurs, the effect may combine action data,
    // the current state of the store, and any other data. It returns a new
    // action which is dispatched against the store.
}
