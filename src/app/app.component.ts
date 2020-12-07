import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopcart-admin';
  user :any;
  isLoggedIn :boolean = false;
  constructor(private router : Router) {}
  ngOnInit() :void{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      }
      else {
        console.log("no user");
        this.isLoggedIn = false;
      }
    });

    if(localStorage.getItem('user')!== null){
      this.isLoggedIn = true;
      this.router.navigate(['/admin/home'])
    }
    else{
      this.isLoggedIn = false;
      this.router.navigate(['/auth/login'])
    }
  }
}
