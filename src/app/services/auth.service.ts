import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  ​
    selectedFile = null;
    uploadPercent: any;
    downloadU: any;
    uniqkey: any;
    today: any = new Date();
    date = this.today.getDate() + "" + (this.today.getMonth() + 1) + "" + this.today.getFullYear();
    time = this.today.getHours() + "" + this.today.getMinutes();
    dateTime = this.date + "" + this.time;
  ​
    progress
  
    constructor(public alertCtrl:AlertController,  
      private afs: AngularFirestore,
      public loadingCtrl: LoadingController,
      private db: AngularFirestore,
      public navCtrl: NavController, 
      private afAuth:AngularFireAuth) {
  
        afAuth.auth.onAuthStateChanged((user) => {
          if (user) {
            // this.navCtrl.navigateRoot("landing");
          } else {
            this.navCtrl.navigateRoot("");
          }
        })
      
    
       }
       
    async signup(email, password) {
      const loading = this.loadingCtrl.create({
        message: 'Registering, Please wait...'
      });
      (await loading).present();
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (success) => {
  ​
        console.log(success);
        (await loading).dismiss();
  ​
      }).catch(async (err) => {
  ​
        (await loading).dismiss();
        
        this.alertCtrl.create({
          subHeader: err.message,
          buttons: ['Ok']
        }).then(
          alert => alert.present()
        );
  ​
      })
    }
    async login(email: string, password: string) {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
        console.log(success);
        this.navCtrl.navigateRoot("home");
      }).catch((err) => {
        this.alertCtrl.create({
          // message: 'You can not order more than six',
          subHeader: err.message,
          buttons: ['Ok']
        }).then(
          alert => alert.present()
        );
      })
    }
    async sendPasswordResetEmail(passwordResetEmail: string) {
      return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
    }
  ​
    async logout() {
      await this.afAuth.auth.signOut().then((success) => {
        console.log(success);
        console.log("success");
        this.navCtrl.navigateRoot("login");
      }).catch((error) => {
        console.log(error)
      })
    }
  

}
