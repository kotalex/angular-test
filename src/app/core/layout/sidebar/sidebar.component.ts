import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/auth/auth.state';
import { AdminMenuItems, MenuItems } from '../../constants/menu-items';
import { RolesEnum } from '../../enums/roles.enum';
import { IMenuItem } from '../../interfaces/menu-item.interface';
import User from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<User>;
  unsubscribe: Subject<void> = new Subject();

  @Input() layout: string = '';

  menuItems: IMenuItem[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.user$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((user: User) => {
      this.menuItems = user.role === RolesEnum.Admin ? AdminMenuItems : MenuItems;
    });
  }

  ngOnDestroy(): void {
      this.unsubscribe.next();
      this.unsubscribe.complete();
  }

}
