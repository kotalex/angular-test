import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutUser } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  layout: string = '';
  showFiller = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new LogoutUser());
  }
}
