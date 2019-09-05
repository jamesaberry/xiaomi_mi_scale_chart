import { Component,OnInit } from '@angular/core';
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
  
  public graph = {
    data: [
        { x: this.dateData, y: this.weightData, type: 'scatter', mode: 'lines', 'line': {'shape': 'spline', 'smoothing': .5} }
    ],
    layout: {}
  };

  async createChart(weightData, dateData) {
    await this._freeApiService.getcomments().subscribe(data => {
        this.scaleEntries = data;
        this.scaleEntries.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
        this.scaleEntries.forEach(function (item, index) {
            weightData.push(parseFloat(item.weight));
            var date = new Date((parseFloat(item.timestamp) * 1000));
            dateData.push(date);
          });
    });
  }

  async ngOnInit()
  {
    this.createChart(this.weightData, this.dateData);
  }
}
