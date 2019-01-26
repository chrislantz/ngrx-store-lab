import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

interface AppState {
    data: any;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor (
     private store: Store<AppState>
  ) {}
}
