import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user = {} as User;
  public signupForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public alertCtrl: AlertController,
    private db: AngularFirestore,
    public navCtrl: NavController,
    private afAuth: AngularFireAuth) {

    this.signupForm = fb.group({

      username: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      // surname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30),Validators.required])],
      // address: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
      // cpassword: ['', Validators.required]

    },
      // {
      //   validator: MustMatch('password', 'cpassword')
      // }
    );
  }

  ngOnInit() {
  }


  tryRegister(name,email,password,gender,age){
    this.authService.signup(name,gender,email,password,age)
     
  }
 
  goLoginPage(){
    this.navCtrl.navigateForward('/login');
  }

  //getting selected type of gender
gender:string='';
changeGender(event: any){
  this.gender=event.target.value;
}

//getting selected age
      age:string='';
      changeAge(event: any){
        this.age=event.target.value;
      }
}
