import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

 isLoggedIn :boolean
  constructor(private fireAuth : AngularFireAuth,
              private router : Router,) { }

  ngOnInit():void{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user;
        this.isLoggedIn = true;
        console.log("no user" + user.uid);
      }
      else {
        this.isLoggedIn = false;
      }
    });

  }


  signout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('user')
      this.router.navigate(['/auth/login'])
    });
  }

}
