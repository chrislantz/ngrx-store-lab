import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { reducer } from './store/reducer';
import { GroceryListEffects } from './store/effects';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({
            groceryList: reducer
        }),
        EffectsModule.forRoot([
            GroceryListEffects
        ]),
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
