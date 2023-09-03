import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Category, Record } from '../shared/models/model';
import * as moment from 'moment';
import { CATEGORY_EXPENSES } from '../shared/constants/categories.const';
import { Subject, takeUntil } from 'rxjs';


interface CurrentMonth {
  name: string,
  income: number,
  expense: number,
  savings: number,
  incomeVsExpected: string,
  expenseVsExpected: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private unsubscribe$ = new Subject<void>();
  records: Record[] = [];
  categories: Category[] = [];
  balance: number = 0;
  currentMonth: CurrentMonth | undefined;
  expectedIncome: number = 50000;
  expectedExpense: number = 30000;
  topSpending: any = [];

  constructor(
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUser();
    this.getBalance();
    this.getCurrentMonth();
    this.getTopSpending();
  }

  getUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userService.getUser();
      this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        const records: Record[] = data.records;
        this.records = records.filter(r => r.isDeleted === false);
        resolve();
      }, error => {
        reject(error);
      });
    });
  }

  getCurrentMonth(): void {
    const currentMonthIncome = this.getCurrentMonthRecord().filter(r => r.categoryType.toLowerCase() === 'income').map(r => r.amount);
    const currentMonthExpense = this.getCurrentMonthRecord().filter(r => r.categoryType.toLowerCase() === 'expense').map(r => r.amount);

    const incomeSum = this.getSum(currentMonthIncome);
    const expenseSum = this.getSum(currentMonthExpense);

    this.currentMonth = {
      name: this.getMonth('long'),
      income: incomeSum,
      expense: expenseSum,
      savings: incomeSum - expenseSum,
      incomeVsExpected: `${(incomeSum / this.expectedIncome) * 100}%`,
      expenseVsExpected: `${(expenseSum / this.expectedExpense) * 100}%`
    }
  }

  getCurrentMonthRecord(): Record[] {
    return this.records.filter(r => moment(r.transactionDate).get('month') === this.getMonth('number'))
  }

  getSum(arr: number[]): number {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
  }

  getMonth(type: string): any {
    const dateNow = new Date();
    return type === 'number' ? dateNow.getMonth() : dateNow.toLocaleString('default', { month: 'long' });
  }

  getBalance(): void {
    const amounts = this.records.map(r => {
      if (r.categoryType.toLowerCase() === 'expense') {
        return -Math.abs(r.amount);
      } else {
        return r.amount
      }
    })
    this.balance = this.getSum(amounts);
  }

  getTopSpending(): void {
    const currentExpenses = this.getCurrentMonthRecord().filter(r => r.categoryType.toLowerCase() === 'expense')
    const groups = currentExpenses.reduce(function (r, a) {
      r[a.categoryName] = r[a.categoryName] || [];
      r[a.categoryName].push(a);
      return r;
    }, Object.create(null));
    const groupSum = Object.entries(groups).map((g: any) => {
      const amounts = g[1].map((item: Record) => item.amount);
      const icon = CATEGORY_EXPENSES.find(v => v.name === g[0])?.icon;
      return {
        name: g[0],
        sum: this.getSum(amounts),
        icon: icon
      }
    }).sort((a, b) => b.sum - a.sum);
    this.topSpending = groupSum ? groupSum.slice(0, 4) : [];
  }

  ngOnDestroy(): void {
    // Emit a value to trigger the unsubscribe in takeUntil
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
