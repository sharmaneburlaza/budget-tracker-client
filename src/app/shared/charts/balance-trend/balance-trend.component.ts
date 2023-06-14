import { Component, Input } from '@angular/core';
import { Record } from '../../models/model';
import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

@Component({
  selector: 'app-balance-trend',
  templateUrl: './balance-trend.component.html',
  styleUrls: ['./balance-trend.component.scss']
})
export class BalanceTrendComponent {
  records: Record[] = [];
  rangeDates = [];
  trendDates = [];
  trendBalance: number[] = [];
  chart: any;

  constructor(
    private userService: UserService
  ) { 
  }

  async ngOnInit(): Promise<void> {
    await this.getUser();
    this.getTrendDatesAndBalances(new Date(2022, 1, 1), new Date());
    this.drawChart();
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

  drawChart(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('lineChart');
    console.log('trendbalance', this.trendBalance)
    console.log('trenddates', this.trendDates)
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.trendDates,
          datasets: [
            {
              data: this.trendBalance,
              label: 'Series A',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)'
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  }

  getTrendDatesAndBalances(start: Date, end: Date): void {
    const dateStart = moment(start).format('YYYY-MM-DD');
    const dateEnd = moment(end).format('YYYY-MM-DD');
    let dateList: any = [];
    let balanceList: number[] = [];
    let runningBalance = 0;

    this.records.forEach(record => {
      const recordDate = moment(record.createdOn).format('YYYY-MM-DD');
      const type = record.categoryType.toLocaleLowerCase();
      if (!recordDate) {
        return;
      }
      if (recordDate>= dateStart && recordDate <= dateEnd) {
        if (!(dateList.includes(recordDate))) {
          if (type === 'income') {
            runningBalance += +record.amount;
          } else {
            runningBalance -= +record.amount;
          }
          balanceList.push(runningBalance);
          dateList.push(recordDate);
        } else {
          const lastBalance = balanceList[balanceList.length-1];
          if (type === 'income') {
            runningBalance = +lastBalance + +record.amount;
          } else {
            runningBalance = +lastBalance - +record.amount;
          }
          balanceList.pop();
          balanceList.push(runningBalance);
        }
      }
    })
    this.trendDates = dateList;
    this.trendBalance = balanceList;
  }

}
