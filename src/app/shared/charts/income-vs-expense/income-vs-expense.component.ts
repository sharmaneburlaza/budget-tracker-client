import { Component } from '@angular/core';
import { Record } from '../../models/model';
import { Chart, registerables } from 'chart.js';
import { UserService } from '../../../services/user.service';
import * as moment from 'moment';

Chart.register(...registerables);

@Component({
  selector: 'app-income-vs-expense',
  templateUrl: './income-vs-expense.component.html',
  styleUrls: ['./income-vs-expense.component.scss']
})
export class IncomeVsExpenseComponent {
  records: Record[] = [];
  incomeRecords: Record[] = [];
  expenseRecords: Record[] = [];
  barChart: any;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.getUser();
    this.drawBarChart();
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

  drawBarChart(): void {
    const monthlyIncome = this.getMonthlyIncome();
    const monthlyExpenses = this.getMonthlyExpense();
    const canvas = <HTMLCanvasElement> document.getElementById('barChart');

    if (canvas) {
      if (this.barChart) {
        this.barChart.destroy();
      }
      this.barChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'Monthly Income for the year 2023',
              backgroundColor: 'rgba(97, 171, 64, 0.2)',
              borderColor: 'rgba(97, 171, 64, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(97, 171, 64, 0.4)',
              hoverBorderColor: 'rgba(97, 171, 64, 1)',
              data: monthlyIncome,
              order: 1
            },
            {
              label: 'Monthly Expenses for the year 2023',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
              hoverBorderColor: 'rgba(255, 99, 132, 1)',
              data: monthlyExpenses,
              order: 2
            }
        ]
        },
        options: {  
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  }

  getIncomeAndExpenseRecords(): void {
    let income: Record[] = [];
    let expense: Record[] = [];

    this.records.forEach(record => {
      const type = record.categoryType.toLocaleLowerCase();
      if (type === 'income') {
        income.push(record);
      } else {
        expense.push(record);
      }
    })

    this.incomeRecords = income;
    this.expenseRecords = expense;
  }

  getMonthlyIncome(): number[] {
    this.getIncomeAndExpenseRecords();

    return this.months.map(month => {
      let income = 0;
      this.incomeRecords.forEach(record => {
        const recordMonth = (moment(record.transactionDate).format('MMMM')).substring(0, 3);
        if (recordMonth === month) {
          income += record.amount;
        }
      })
      return income;
    })
  }

  getMonthlyExpense(): number[] {
    this.getIncomeAndExpenseRecords();

    return this.months.map(month => {
      let expenses = 0;
      this.expenseRecords.forEach(record => {
        const recordMonth = (moment(record.transactionDate).format('MMMM')).substring(0, 3);
        if (recordMonth === month) {
          expenses += record.amount;
        }
      })
      return expenses;
    })
  }

}
