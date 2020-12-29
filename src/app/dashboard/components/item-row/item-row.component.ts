import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.scss']
})
export class ItemRowComponent implements OnInit {
  @Input() image :string;
  @Input() name :string;
  @Input() count :string
  @Input() icon :string
  constructor() { }

  ngOnInit(): void {
  }

}
