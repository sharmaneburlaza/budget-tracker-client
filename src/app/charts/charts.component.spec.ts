import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceTrendComponent } from '../shared/charts/balance-trend/balance-trend.component';
import { CategoryBreakdownComponent } from '../shared/charts/category-breakdown/category-breakdown.component';
import { IncomeVsExpenseComponent } from '../shared/charts/income-vs-expense/income-vs-expense.component';

import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ChartsComponent,
        BalanceTrendComponent,
        IncomeVsExpenseComponent,
        CategoryBreakdownComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
