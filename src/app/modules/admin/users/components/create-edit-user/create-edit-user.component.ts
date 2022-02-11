import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import { GetUsers } from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';

import User from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  form!: FormGroup;
  user!: User | null;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.store.selectSnapshot(UsersState.single);
    
    this.form = this.formBuilder.group({
      firstName: new FormControl(this.user ? this.user.firstName : '', [Validators.required]),
      lastName: new FormControl(this.user ? this.user.lastName : '', [Validators.required]),
      email: new FormControl(this.user ? this.user.email : '', [Validators.required, Validators.email]),
      role: new FormControl(this.user ? this.user.role : '', [Validators.required]),
      password: new FormControl('', !this.user ? [Validators.required, Validators.minLength(8)] : []),
      confirmPassword: new FormControl('', !this.user ? [Validators.required, passwordMatchValidator('password')] : []),
    });
  }

  goBack() {
    this.router.navigate(['admin/users']);
  }

  async onSubmit() {
    let response$: Observable<User>;

    if (this.user) {
      response$ = this.usersService.updateUser(this.user._id, this.form.value);      
    } else {
      response$ = this.usersService.createUser(this.form.value);
    }

    response$
      .pipe(first())
      .subscribe(() => {
        this.store.dispatch(new GetUsers());

        this.snack.open(`User ${this.user ? 'updated' : 'created'} successfully`, 'x', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
  
        this.goBack();
      });    
  }
}
