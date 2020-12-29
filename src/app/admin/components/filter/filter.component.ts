import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  @Output () callParentFunction :EventEmitter<string> = new EventEmitter<any>()
  @Output () callParentFunction2 :EventEmitter<string> = new EventEmitter<any>()
  @Input() rotateIconNow :boolean
  dateRange :string = "";
  selectedOption :string = ""
  ranges: any = [
  {
    value: [new Date(new Date().setDate(new Date().getDate() - 0)), new Date()],
    label: 'Today'
  },
  {
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: 'Last 7 Days'
  }];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.rotateIconNow.currentValue){
      if(this.rotateIconNow){
        this.dateRange = ""
        this.selectedOption = ""
      }
    }
  }

  filterByPreference(filterOn){
    //this.filterArg = filterOn;
    this.callParentFunction.emit(filterOn);
  }

  datePicker($event){
    if($event){
      let startDate :string = $event[0].toJSON().split('T')[0];
      let endDate :string = $event[1].toJSON().split('T')[0];
      let newDate :any = {startDate :startDate, endDate :endDate}
      this.callParentFunction2.emit(newDate);
    }
  }
}
