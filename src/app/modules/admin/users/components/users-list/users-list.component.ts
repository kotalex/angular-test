import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsers, SetSingleUser } from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

import User from 'src/app/core/models/user.model';
import { first } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private usersService: UsersService
  ) { }

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
    this.router.navigate([`admin/users/${user._id}/edit`]);
  }

  deleteUser(userId: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you wish to delete this user?'
      }
    })
    
    dialogRef.afterClosed()
      .pipe(first())
      .subscribe((confirmed) => {
        if (confirmed) {
          this.usersService.deleteUser(userId)
            .pipe(first())
            .subscribe(() => {
              this.snack.open('User deleted successfully', 'x', {
                duration: 3000,
                panelClass: 'success-snackbar'
              });

              this.store.dispatch(new GetUsers());
            });
        }
      });
  }
}
