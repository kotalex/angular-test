import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`).pipe(timeout(5000));
  }

  createUser(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/users`, data).pipe(timeout(5000));
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.baseUrl}/users/${id}`, data).pipe(timeout(5000));
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/users/${id}`).pipe(timeout(5000));
  }
}
