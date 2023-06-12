import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo, RegisterInfo } from '../models/model';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AUTH_API = 'http://localhost:4000/api/user/';
  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo): Observable<any> {
    return this.http.post(this.AUTH_API + 'login', loginInfo, this.httpOptions);
  }

  emailExists(email: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'email-exists', { email }, this.httpOptions);
  }

  register(registerInfo: RegisterInfo): Observable<any> {
    return this.http.post(this.AUTH_API + 'register', registerInfo, this.httpOptions);
  }

  isLoggedIn(): boolean {
    return !!window.sessionStorage.getItem(TOKEN_KEY);
  }

}
