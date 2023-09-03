import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginInfo } from '../shared/models/model';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup<any>;
  isLoginSuccessful: boolean | undefined;
  errorMessage: string | undefined;

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
    this.authService.emailExists(email).subscribe(result => {
      if (result) {
        this.isLoginSuccessful = true;
        this.login({email, password});
      } else {
        this.errorMessage = 'Email does not exist.';
        this.isLoginSuccessful = false;
      }
    })
  }

  login(loginInfo: LoginInfo): void {
    console.log(loginInfo)
    this.authService.login(loginInfo).subscribe(
      async data => {
        if (!data.error) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          await this.router.navigate(['/dashboard']);
          window.location.reload();
        } else {
          this.isLoginSuccessful = false;
          this.errorMessage = data.error === 'incorrect-password' ? 'Incorrect password!' : data.error;
        }
      }
    );
  }
  
}
