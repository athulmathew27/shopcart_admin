import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';

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

    // if(localStorage.getItem('user')!== null){
    //   this.isLoggedIn = true;
    //   this.router.navigate(['/home', 'product'])
    // }
    // else{
    //   this.isLoggedIn = true;
    //   //this.router.navigate(['/auth/login'])
    // }
  }
}
