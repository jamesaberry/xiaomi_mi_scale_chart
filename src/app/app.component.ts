import { Component,OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { freeApiService } from '../services/freeapi.service';
import { ScaleEntry } from './classes/ScaleEntry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _freeApiService: freeApiService) {
  }
  
  title = 'Mi Scale Weight Chart';
  LineChart=[];
  scaleEntries:ScaleEntry[];
  weightData=[];
  dateData=[];

  async createChart(weightData, dateData) {
    await this._freeApiService.getcomments().subscribe(data => {
        this.scaleEntries = data;
        this.scaleEntries.forEach(function (item, index) {
            weightData.push(parseFloat(item.weight));
            var date = new Date((parseFloat(item.timestamp) * 1000));
            dateData.push(date.getFullYear() + "-" 
                + (date.getMonth() + 1) + "-"
                + date.getDate() + " "
                + date.getHours()+ ":"
                + date.getMinutes() + ":"
                + date.getSeconds());
          });
          this.LineChart = new Chart('lineChart', {
            type: 'line',
            data: {
                labels: this.dateData,
                datasets: [{
                    label: 'Weight in lbs',
                    data: this.weightData,
                    fill:false,
                    lineTension:0.2,
                    borderColor:"red",
                    borderWidth: 1
                }]
            }, 
            options: {
            title:{
                text:"Line Chart",
                display:true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }]
            }
            }
        });
    });
  }

  async ngOnInit()
  {
    this.createChart(this.weightData, this.dateData);
  }
}
