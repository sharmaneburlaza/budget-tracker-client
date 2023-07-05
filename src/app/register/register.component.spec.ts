import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        AuthService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required firstName field', () => {
    const control = component.form.get('firstName');
    control?.setValue('');
    expect(control?.invalid).toBeTruthy();
    expect(control?.errors?.['required']).toBeTruthy();
  });

  it('should have required lastName field', () => {
    const control = component.form.get('lastName');
    control?.setValue('');
    expect(control?.invalid).toBeTruthy();
    expect(control?.errors?.['required']).toBeTruthy();
  })

  it('should have required and valid email field', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.invalid).toBeTruthy();
    expect(control?.errors?.['required']).toBeTruthy();
    
    control?.setValue('invalid_email');
    expect(control?.invalid).toBeTruthy();
    expect(control?.errors?.['email']).toBeTruthy();

    control?.setValue('valid@example.com');
    expect(control?.valid).toBeTruthy();
  })

  it('should have required and valid password field', () => {
    const control = component.form.get('password');

    control?.setValue('');
    expect(control?.invalid).toBeTruthy();
    expect(control?.errors?.['required']).toBeTruthy();

    control?.setValue('passw');
    expect(control?.invalid).toBeTruthy();
    expect(control?.errors?.['minlength']).toBeTruthy();

    control?.setValue('password123');
    expect(control?.invalid).toBeTruthy();
    expect(control?.errors?.['pattern']).toBeTruthy();

    control?.setValue('ValidPassword1');
    expect(control?.valid).toBeTruthy();
  })
});
