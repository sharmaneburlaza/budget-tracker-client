import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo, RegisterInfo } from '../models/model';

const AUTH_API = 'http://localhost:4000/api/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo): Observable<any> {
    return this.http.post(AUTH_API + 'login', loginInfo, httpOptions);
  }

  emailExists(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'email-exists', { email }, httpOptions);
  }

  register(registerInfo: RegisterInfo): Observable<any> {
    return this.http.post(AUTH_API + 'register', registerInfo, httpOptions);
  }

}
