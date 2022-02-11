import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { StoreUser } from './store/auth/auth.actions';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-test';

  constructor(private store: Store) {}
  
  ngOnInit(): void {
      const token = localStorage.getItem('token');
      if (token) {
        this.store.dispatch(new StoreUser(jwt_decode(token)));
      }
  }
}
