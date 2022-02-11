import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsers, SetSingleUser } from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';
import User from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Select(UsersState.users)  
  users$!: Observable<User[]>;

  loaded!: boolean;
  
  columns: string[] = [
    'First Name',
    'Last Name',
    'Email',
    'Role'
  ];
  
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role'  
  ];

  addButton = {
    link: 'create',
    text: 'Add User'
  }

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    const loaded = this.store.selectSnapshot(UsersState.loaded);
    
    if (!loaded) {
      this.store.dispatch(new GetUsers());
    }
  }

  createUser() {
    this.store.dispatch(new SetSingleUser(null));
    this.router.navigate(['admin/users/create']);
  }

  editUser(user: User) {
    this.store.dispatch(new SetSingleUser(user));
    this.router.navigate([`admin/users/${user._id}/edit`]);
  }

  deleteUser($event: Event) {
    console.log('deleteUser: ', $event);
  }
}
