import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LoginInfo } from '../shared/models/model';
import { AuthService } from '../shared/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method if email exists', () => {
    spyOn(authService, 'emailExists').and.returnValue(of(true));
    spyOn(component, 'login');

    // Set-up form values
    component.form = { value: { email: 'test@example.com', password: 'password123' } as LoginInfo } as any;

    // Call the onSubmit method
    component.onSubmit();

    expect(authService.emailExists).toHaveBeenCalledWith('test@example.com');
    expect(component.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(component.errorMessage).toBeUndefined();
    expect(component.isLoginSuccessful).toBe(true);
  });

  it('should set error message and isLoginSuccessful to false if email does not exist', () => {
    spyOn(authService, 'emailExists').and.returnValue(of(false));
    component.form = { value: { email: 'nonexistent@example.com', password: 'password123' } as LoginInfo } as any;
    spyOn(component, 'login');
    component.onSubmit();

    expect(authService.emailExists).toHaveBeenCalledWith('nonexistent@example.com');
    expect(component.login).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Email does not exist.');
    expect(component.isLoginSuccessful).toBe(false);
  });

  it('should fo nothing if both email and password are empty', () => {
    spyOn(authService, 'emailExists');
    component.form = { value: { email: '', password: '' } as LoginInfo } as any;
    spyOn(component, 'login');
    component.onSubmit();

    expect(authService.emailExists).not.toHaveBeenCalled();
    expect(component.login).not.toHaveBeenCalled();
    expect(component.errorMessage).toBeUndefined();
    expect(component.isLoginSuccessful).toBeUndefined();
  });

});
