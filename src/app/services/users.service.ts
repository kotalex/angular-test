import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import User from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers(): Observable<User[]> {
    return of([
      {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: 'Admin@user.com',
          role: 'Admin'
      }
    ]);
  }
}
