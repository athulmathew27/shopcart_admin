import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { firebase } from '@firebase/app';
// import '@firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { AdminModule } from 'src/app/admin/admin.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  provider: any;
  user : any;
  email1 :string = "";
  password1 :string = "";
  constructor(private fireAuth : AngularFireAuth,
              private router : Router,
            ) { }

  ngOnInit(): void {
    // this.provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log(user);
    //   }
    //   else {
    //     console.log("no user");
    //   }
    // });

  }


  signin(formData){
    this.email1 = formData.emailid;
    this.password1 = formData.pass;
    this.fireAuth.signInWithEmailAndPassword(this.email1,this.password1)
    .then(res =>{
      if(res.user.email == "admin@admin.com"){
        localStorage.setItem('user',JSON.stringify(res.user));
        this.router.navigate(['/admin/home'])
      }
      else{
        this.router.navigate(['/auth/login'])
      }
    }).catch(err=>{
      alert(err)
    })
 }






}
