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
import { groceryListInitialState, GroceryListStoreName } from './data.model';
import { GroceryItemComponent } from './grocery-item/grocery-item.component';
import { PricingService } from './pricing.service';
import { GroceryDataService } from './grocery-data.service';

@NgModule({
    declarations: [
        AppComponent,
        GroceryItemComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(GroceryListStoreName, reducer, {
            initialState: groceryListInitialState
        }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([
            GroceryListEffects
        ]),
        FormsModule,
        // !environment.production ? StoreDevtoolsModule.instrument() : []
        StoreDevtoolsModule.instrument({
            logOnly: environment.production
        })
    ],
    providers: [PricingService, GroceryDataService],
    bootstrap: [AppComponent]
})
export class AppModule {}
