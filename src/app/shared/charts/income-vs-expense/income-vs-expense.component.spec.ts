import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user.service';

import { IncomeVsExpenseComponent } from './income-vs-expense.component';

describe('IncomeVsExpenseComponent', () => {
  let component: IncomeVsExpenseComponent;
  let fixture: ComponentFixture<IncomeVsExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeVsExpenseComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeVsExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
