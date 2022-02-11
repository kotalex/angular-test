import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'server/dist/modules/users/schemas/user.schema';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import { UsersState } from 'src/app/store/users/users.state';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  @Select(UsersState.single) single$!: Observable<User | null>;

  form!: FormGroup;

  constructor(private store: Store, private location: Location, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const user: User | null = this.store.selectSnapshot(UsersState.single);
    
    this.form = this.formBuilder.group({
      firstName: new FormControl(user ? user.firstName : '', [Validators.required]),
      lastName: new FormControl(user ? user.lastName : '', [Validators.required]),
      email: new FormControl(user ? user.email : '', [Validators.required, Validators.email]),
      role: new FormControl(user ? user.role : '', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, passwordMatchValidator('password')]),      
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
