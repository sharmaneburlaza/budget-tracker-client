import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInfo } from '../shared/models/model';
import { AuthService } from '../shared/services/auth.service';
import { TokenStorageService } from '../shared/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup<any>;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    });
  }

  onSubmit(): void {
    const { email, password } = this.form?.value;
    if (!(email || password)) {
      return;
    }
    this.authService.emailExists(email).subscribe(data => {
      if (data) {
        this.login({email, password});
      } else {
        this.errorMessage = 'Email does not exists.';
        this.isLoginFailed = true;
      }
    })
  }

  login(loginInfo: LoginInfo): void {
    this.authService.login(loginInfo).subscribe(
      data => {
        if (!data.error) {
          console.log(data)
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/records']);
          window.location.reload();
        } else {
          this.isLoginFailed = true;
          this.errorMessage = data.error === 'incorrect-password' ? 'Incorrect password!' : data.error;
        }
      }
    );
  }
  
}
