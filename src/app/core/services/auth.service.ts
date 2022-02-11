import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interfaces/login.interface';
import { ITokenResponse } from '../interfaces/token.response.interface';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  loginUser(data: ILogin): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${environment.baseUrl}/auth/login`, data);
  }

}
