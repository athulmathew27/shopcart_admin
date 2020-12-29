import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrderFull } from '../../models/order-full.model';
import { Chart } from 'chart.js';
import * as moment from 'moment'
@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements OnInit, OnChanges {
  @Input() products :OrderFull[]
  last7days = []
  toCalculateValue = []
  chartData = []
  chartLabel = []
  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.products.currentValue){
      var date
      for (let i = 0; i < 7; i++) {
       this.last7days.push( moment().add(-i, 'days').format("MMM DD" ))
        // date = new Date();
        // date.setDate(date.getDate() - i);
        // this.last7days.push(date);
      }
      this.sorter(this.last7days)

    }
  }
  sorter(date){
    this.products.forEach(product=>{
      var orderplacedOn = moment(product.orderPlacedTime.seconds*1000).format("MMM DD" )
      for (let i = 0; i < this.last7days.length; i++) {
       // var day = moment(this.last7days[i]).format("MMM DD" )
        if(orderplacedOn == this.last7days[i]){
          let newObj = {
            day : this.last7days[i],
            price : product.price * product.quantity
          }
          this.toCalculateValue.push(newObj)
        }
      }
    })
    this.merger()
  }

  merger(){
    var pay
    var temp = []
    for (let i = 0; i < this.toCalculateValue.length; i++) {
      pay = 0
      if(!temp.some(item => item.date === this.toCalculateValue[i].day)){
        for (let j = 0; j < this.toCalculateValue.length; j++) {
          if(this.toCalculateValue[i].day == this.toCalculateValue[j].day){
            pay = pay + this.toCalculateValue[j].price
          }
        }
        var obj = {
          date :  this.toCalculateValue[i].day,
          pay : pay
        }
        temp.push(obj)
      }
    }
    this.filler(temp)
  }

  filler(data){

    for (let i = 0; i < this.last7days.length; i++) {
      if(!data.some(item => item.date == this.last7days[i])){
        var obj = {
          date : this.last7days[i],
          pay : 0
        }
        data.push(obj)
      }
    }
    function custom_sort(a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    var sorted = data.sort(custom_sort)
    this.divider(sorted)
  }

  divider(sorted){
    for (let i = 0; i < sorted.length; i++) {
      this.chartData.push(sorted[i].pay)
      this.chartLabel.push(sorted[i].date)
    }
    this.chart()
  }

  chart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.chartLabel,
            datasets: [{
                label: 'Sales',
                data: this.chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                  stacked: true,
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                  }
                }],
                xAxes: [{
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                  }
                }],
            }
        }
    });
  }
}
