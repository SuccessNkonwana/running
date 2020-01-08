import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  users: any;
  currentuser: string;
  private MUsers: AngularFirestoreDocument
  sub
  username: string;
  photoURL: string;
  uploadPercent: number;
  thegender: string;
  constructor(
    private authService: AuthService,
    public afs:AngularFirestore,
    private altctrl: AlertController,
    public afAuth: AngularFireAuth,
    private router: Router
  ) { 
    this.users=this.afs.collection('users',ref =>ref.orderBy('displayName')).valueChanges();
    // this.currentuser=this.authService.getUID();
    console.log("current user=>>"+this.currentuser)
    this.MUsers=afs.doc('users/${authService.getUID()}')
    this.sub= this.MUsers.valueChanges().subscribe(event=>{
      this.username=event.displayName
      this.photoURL=event.photoURL
    })
  }

  ngOnInit() {
  }
  // update name
  async NameUpdate(user) {
    const alert = await this.altctrl.create({
      subHeader: 'Add/Edit Name',
      inputs: [
        {
          name: 'displayName',
          type: 'text',
          value: user.displayName,
          placeholder: 'displayName'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (inputData) => {
            console.log(inputData.name1)
            this.MUsers.update({

              displayName: inputData.displayName,
            })

          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }
  uploadProfilePic(event){
    this.authService.uploadProfilePic(event).subscribe((data:number)=>{
      this.uploadPercent=data
      console.log(this.uploadPercent)
    })
  }

  pickImage(){
    this.authService.pickImage();
  }
}
