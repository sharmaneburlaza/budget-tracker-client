import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { Record } from '../../models/model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


interface PieRecord {
  name: string,
  amount: number
}

@Component({
  selector: 'app-category-breakdown',
  templateUrl: './category-breakdown.component.html',
  styleUrls: ['./category-breakdown.component.scss']
})
export class CategoryBreakdownComponent {
  records: Record[] = [];
  incomeRecords: Record[] = [];
  expenseRecords: Record[] = [];

  incomePieChart: Chart | undefined;
  expensePieChart: Chart | undefined;


  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.getUser();
    this.getIncomeAndExpense(new Date(2022, 1, 1), new Date());
    this.drawIncomePie();
    this.drawExpensePie();

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

  drawIncomePie(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('incomePieChart');
    const names = this.getNamesAndAmounts(this.incomeRecords).map(na => na.name);
    const amounts: number[] = this.getNamesAndAmounts(this.incomeRecords).map(na => na.amount);
    const bgColors = this.incomeRecords.map(() => `#${this.colorRandomizer()}`);

    this.drawPieChart(canvas, names, amounts, bgColors);
  }

  drawExpensePie(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('expensePieChart');
    const names: string[] = this.getNamesAndAmounts(this.expenseRecords).map(na => na.name);
    const amounts: number[] = this.getNamesAndAmounts(this.expenseRecords).map(na => na.amount);
    const bgColors = this.expenseRecords.map(() => `#${this.colorRandomizer()}`);

    this.drawPieChart(canvas, names, amounts, bgColors);
  }

  getIncomeAndExpense(start: Date, end: Date): void {
    const dateStart = moment(start).format('L');
    const dateEnd = moment(end).format('L');
    let incomeList: Record[] = [];
    let expenseList: Record[] = [];

    this.records.forEach(record => {
      const recordDate = moment(record.createdOn).format('L');
      const type = record.categoryType.toLowerCase();
      if (recordDate >= dateStart && recordDate <= dateEnd) {
        if (type === 'income') {
          incomeList.push(record);
        } else {
          expenseList.push(record);
        }
      }
    })
    this.incomeRecords = incomeList;
    this.expenseRecords = expenseList;
  }

  getNamesAndAmounts(records: Record[]): PieRecord[] {
    const namesAndAmounts: PieRecord[] = [];
    records.forEach(record => {
      let pieRecord = {name:'', amount: 0};
      const { categoryName, amount } = record;
      if (!namesAndAmounts.find(n => n.name === categoryName)) {
        pieRecord.name = categoryName;
        pieRecord.amount = amount;
        namesAndAmounts.push(pieRecord);
      } else {
        let pieRecordIndex;
        pieRecordIndex = namesAndAmounts.findIndex(pr => pr.name === categoryName);
        namesAndAmounts[pieRecordIndex]['amount'] += amount;
      }
    })
    return namesAndAmounts;
  }

  drawPieChart(canvas: HTMLCanvasElement, names: string[], amounts: number[], bgColors: string[]): any {
    return new Chart(canvas, {
      type: 'pie',
      data: {
        labels: names,
        datasets: [{
          data: amounts,
          backgroundColor: bgColors,
          hoverBackgroundColor: bgColors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    })
  }

  colorRandomizer(): string {
    return Math.floor(Math.random()*16777215).toString(16);
  }
}
