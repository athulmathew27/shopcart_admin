import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Status } from '../../models/status.model'
@Component({
  selector: 'app-add-update-status',
  templateUrl: './add-update-status.component.html',
  styleUrls: ['./add-update-status.component.scss']
})
export class AddUpdateStatusComponent implements OnInit {

  @Input() productId :string;
  @Input() orderId :string;
  @Input() currentStatus;
  @Output() callParentFunction :EventEmitter<any> = new EventEmitter();
  constructor(private firestore : AngularFirestore,
              ) { }

  ngOnInit(): void { }
  onUpdate(updateFormValue){
    console.log(updateFormValue)
    var statusData :Status= {
      status : updateFormValue.status,
      text : updateFormValue.description,
      time : updateFormValue.date,
      location : updateFormValue.location
    }
    this.firestore.collection('orders').doc(this.orderId).collection('products').doc(this.productId).collection('status').add(statusData).then(()=>{
      alert("Updated")
      this.callParentFunction.emit("false")
    })
    .catch(err=>{
      alert(err);
    })
  }
  onCancel(){
    this.callParentFunction.emit("false")
  }
}
