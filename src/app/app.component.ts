import { Component,OnInit } from '@angular/core';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mi Scale Weight Chart';
  LineChart=[];

  ngOnInit()
  {
    this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "March", "April"],
            datasets: [{
                label: 'Weight in lbs',
                data: [293.10, 294.10, 295.20, 292.40],
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
  }
}
