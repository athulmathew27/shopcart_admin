import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() isLoggedIn :boolean;
  isLogin :boolean = false;
  constructor(private fireAuth : AngularFireAuth,
              private router : Router,) { }

  ngOnInit():void{}
  ngOnChanges(change :SimpleChanges) {
    if(change.isLoggedIn.currentValue){
      this.isLogin = this.isLoggedIn
    }
  }
  signout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('user')
      this.router.navigate(['/auth/login'])
    });
  }

}
