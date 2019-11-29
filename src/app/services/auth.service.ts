import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // signup(name: any, gender: any, email: any, password: any, race: any) {
  //   throw new Error("Method not implemented.");
  // }
  signup(name, gender, email, password,age){
    firebase.auth().createUserWithEmailAndPassword(email,password).then((credential) => {
      this.db.collection('users').doc(credential.user.uid).set({
        username : name,
        email : email,
        UserID: firebase.auth().currentUser.uid,
        // ethnicity : ethnicity ,
        gender:gender ,
        age:age
      }).then(() => {
        this.navCtrl.navigateRoot('/login');
        this.afAuth.auth.currentUser.updateProfile({
          displayName : name,
        })
      }).catch(err => {
        alert(err.message);
      });
    }).catch(err => {
      alert(err.message);
    });
   }
  loginUser(value: any) {
    throw new Error("Method not implemented.");
  }

  constructor(public alertCtrl:AlertController,  
    private db: AngularFirestore,
    public navCtrl: NavController, 
    private afAuth:AngularFireAuth) { }
}
