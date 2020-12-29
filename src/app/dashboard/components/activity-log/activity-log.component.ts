import { Component, Input, OnInit } from '@angular/core';
import { OrderFull } from '../../models/order-full.model';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  @Input() products :OrderFull[]
  constructor() { }

  ngOnInit(): void {
  }

}
