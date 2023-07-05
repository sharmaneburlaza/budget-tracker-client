import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { RegisterInfo } from '../shared/models/model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<any>;
  isSignUpSuccessful: boolean = false;
  passwordMatched: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', 
        [
          Validators.required, 
          Validators.minLength(6), 
          Validators.maxLength(32),
          Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$')
        ]
      ],
      confirmPassword: ['', 
        [
          Validators.required, 
          Validators.minLength(6), 
          Validators.maxLength(32),
          Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$')
        ]
      ],
    });
  }

  onSubmit(): void {
    const { firstName, lastName, email, password, confirmPassword } = this.form?.value;
    
    if (!(firstName || lastName || email || password || confirmPassword)) {
      return;
    }
    if (password !== confirmPassword) {
      this.passwordMatched = false;
    } else {
      this.authService.emailExists(email).pipe(first()).subscribe(data => {
        if (!data) {
          this.passwordMatched = true;
          this.register({firstName, lastName, email, password});
        } else {
          this.errorMessage = 'Email already exists.';
          this.isSignUpSuccessful = false;
        }
      })
    }
  }

  register(registerInfo: RegisterInfo): void {
    this.authService.register(registerInfo).pipe(first()).subscribe(data => {
      if (data) {
        this.isSignUpSuccessful = true;
        this.router.navigate(['/login']);
      } else {
        // this.errorMessage = err.error.message
        this.isSignUpSuccessful = false;
      }
    })
  }
}
