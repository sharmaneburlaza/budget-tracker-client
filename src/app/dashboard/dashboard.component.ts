import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Category, Record } from '../shared/models/model';
import * as moment from 'moment';


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
  records: Record[] = [];
  categories: Category[] = [];
  balance: number = 0;
  currentMonth: CurrentMonth | undefined;
  expectedIncome: number = 30000;
  expectedExpense: number = 2000;

  constructor(
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUser();
    this.getBalance();
    this.getCurrentMonth();
  }

  getUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userService.getUser();
      this.userService.user$.subscribe(data => {
        const records: Record[] = data.records;
        this.records = records.filter(r => r.isDeleted === false);
        resolve();
      }, error => {
        reject(error);
      });
    });
  }

  getCurrentMonth(): void {
    const currentMonthIncome = this.records
      .filter(r => moment(r.createdOn).get('month') === this.getMonth('number')
        && r.categoryType.toLowerCase() === 'income').map(r => r.amount);
    const currentMonthExpense = this.records
      .filter(r => moment(r.createdOn).get('month') == this.getMonth('number') 
        && r.categoryType.toLowerCase() === 'expense').map(r => r.amount);

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

    console.log(this.currentMonth)
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

}
