import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';

import { reducer } from './store/reducer';
import { GroceryListEffects } from './store/effects';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { groceryListInitialState } from './data.model';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({
            groceryList: reducer,
        }, {
            initialState: {
                groceryList: groceryListInitialState
            }
        }),
        EffectsModule.forRoot([
            GroceryListEffects
        ]),
        FormsModule,
        // !environment.production ? StoreDevtoolsModule.instrument() : []
        StoreDevtoolsModule.instrument({
            logOnly: environment.production
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
