import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  users: any;
  theUser=[];
  currentuser: string;
  private MUsers: AngularFirestoreDocument
  sub
  username: string;
  photoURL: string;
  uploadPercent: number;
  constructor(
    private authService: AuthService,
    public afs:AngularFirestore,
    private altctrl: AlertController,
    public afAuth: AngularFireAuth,
    private router: Router,
    public runn: RunningService
  ) { 
    this.theUser=[]    
    this.getdata()

    this.users=this.afs.collection('users',ref =>ref.orderBy('displayName')).valueChanges();
    this.currentuser=this.authService.getUID();
    console.log("current user=>>"+this.currentuser)
    this.MUsers=afs.doc('users/${authService.getUID()}')
    this.sub= this.MUsers.valueChanges().subscribe(event=>{
      this.username=event.displayName
      this.photoURL=event.photoURL
      console.log("the user name"+ this.username)
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
  getdata()
  {
    return new Promise((resolve, reject) => {
      this.runn.rtClubs().then(data =>{
     
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.theUser.push({ 
          todoKey:  data[x].todoKey,
          name:  data[x].name,
          age:  data[x].age,
          email:  data[x].email,
          gender:  data[x].gender,
          photoURL:data[x].photoURL}
          
          )
          // userKey: doc.id,
          //    name: doc.data().displayName,
          //    age: doc.data().Age,
          //    Email: doc.data().Email,
          //    gender: doc.data().gender,
          //    photoURL: doc.data().photoURL
    
        }
      console.log(this.theUser,"LAST ONE")

     })
    })
  
  }
 
}
